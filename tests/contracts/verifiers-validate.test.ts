import { match, strictEqual } from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { it } from "node:test";
import { PROJECT_VERIFIER_CATALOG_RELATIVE_PATH } from "../../src/tools/verify/catalog.js";
import { makeScratchHome } from "../harness/scratch-env.js";

const catalog = (id: string) =>
	[
		"version: 2",
		"checks:",
		`  - id: ${id}`,
		"    description: Scratch check.",
		'    command: ["node", "--version"]',
		'    cwd: "."',
		"    timeoutMs: 60000",
		'    tags: ["scratch"]',
		"",
	].join("\n");

function scratchProject(files: Record<string, string>) {
	const scratch = makeScratchHome("clio-verifiers-validate-");
	const project = join(scratch.dir, "project");
	for (const [relative, text] of Object.entries(files)) {
		const path = join(project, relative);
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, text);
	}
	mkdirSync(project, { recursive: true });
	const module = resolve("src/cli/verifiers.ts");
	const tsx = import.meta.resolve("tsx");
	const run = (...args: string[]) =>
		spawnSync(
			process.execPath,
			[
				"--import",
				tsx,
				"--input-type=module",
				"-e",
				`import { runVerifiersCommand } from ${JSON.stringify(module)}; process.exitCode = await runVerifiersCommand(${JSON.stringify(args)});`,
			],
			{ cwd: project, env: { ...process.env, ...scratch.env }, encoding: "utf8" },
		);
	return { run, cleanup: scratch.cleanup };
}

it("fails validate when the catalog collides with a package.json script and blocks discovery", () => {
	const { run, cleanup } = scratchProject({
		"package.json": JSON.stringify({ name: "scratch", scripts: { typecheck: "tsc --noEmit" } }),
		[PROJECT_VERIFIER_CATALOG_RELATIVE_PATH]: catalog("typecheck"),
	});
	try {
		const result = run("validate");
		strictEqual(result.status, 1, `validate accepted a catalog that blocks discovery:\n${result.stdout}`);
		match(result.stderr, /duplicate declared check id 'typecheck'/);
	} finally {
		cleanup();
	}
});

it("accepts a catalog whose ids do not collide with package.json scripts", () => {
	const { run, cleanup } = scratchProject({
		"package.json": JSON.stringify({ name: "scratch", scripts: { typecheck: "tsc --noEmit" } }),
		[PROJECT_VERIFIER_CATALOG_RELATIVE_PATH]: catalog("gate-typecheck"),
	});
	try {
		const result = run("validate");
		strictEqual(result.status, 0, result.stderr);
		match(result.stdout, /accepted .*\(1 check\)/);
	} finally {
		cleanup();
	}
});

it("still reports a missing catalog as success and a malformed catalog as failure", () => {
	const missing = scratchProject({ "package.json": JSON.stringify({ name: "scratch" }) });
	try {
		const result = missing.run("validate");
		strictEqual(result.status, 0, result.stderr);
		match(result.stdout, /No .* exists/);
	} finally {
		missing.cleanup();
	}
	const malformed = scratchProject({ [PROJECT_VERIFIER_CATALOG_RELATIVE_PATH]: "version: 2\nchecks: not-a-list\n" });
	try {
		const result = malformed.run("validate");
		strictEqual(result.status, 1);
		match(result.stderr, /rejected/);
	} finally {
		malformed.cleanup();
	}
});
