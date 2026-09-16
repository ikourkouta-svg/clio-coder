# v0.4.9 handoff: tool audit, decisions, and slice plan

Written 2026-09-16 by the session that performed the source audit for the
v0.4.9 mandate in `v049-action-plan.md`. Read that file first; this file is
the state of the work and the evidence behind every decision. Nothing here is
in the git history except where the "Tree state" section says so.

## 1. Tree state at handoff

- Branch `v049`, base `66a5862c` (four cleanup commits from the previous
  session sit on top of `main` at `c841a461`, which equals the `v048` branch).
- Baseline gates before any change: `pnpm run typecheck` exit 0;
  `pnpm run lint` exit 0 with 2 pre-existing warnings and 2 infos;
  `pnpm run test` was green at 283/284 (1 Windows-only skip) per the previous
  session. Logs from this session: scratchpad `baseline-typecheck.log`,
  `baseline-lint.log` (session scratch, not in the repo).
- The audit session itself edited no tracked file. Four background forks were
  launched on bounded, file-exclusive slices; their state at the moment this
  file was written is recorded in section 7 ("Fork slices"). Run `git status`
  first: every new or modified path belongs to exactly one of those slices.
- No commits were made in this session. The Bash tool contract for this
  workspace says commit only when the operator asks; the operator has not yet
  said whether landed slices should be committed one by one on `v049`.
  Recommendation: one commit per landed slice, conventional-commit subject,
  gates green at every commit.

## 2. Ground truth gathered (so nobody re-reads 26K lines to learn it)

Tool surface today: 24 builtins in `src/core/tool-names.ts`, seven planes,
asserted at bootstrap by `src/tools/policy.ts` (`TOOL_PLANES`, envelope caps,
required registration). `gateway` is a reserved name in a comment only
(`tool-names.ts:46-54`); `src/domains/safety/safety-model.md` calls it
"design-reserved". No MCP client exists anywhere in `src/` (ACP rejects
non-empty `mcpServers`, `src/engine/acp/server.ts:2191-2195`; plugin
`mcp.json` is preserved but never executed, `src/domains/plugins/discovery.ts:281-286`).

Registration and admission:
- `src/tools/core-bootstrap.ts` registers the core surface; `bootstrap.ts`
  adds dispatch/monitor/steer (when a dispatch contract exists), panes (when a
  pane host exists), then `registerHarnessExtensionTools` (extension command
  tools named `extension_<id>__<name>`).
- `src/tools/registry.ts`: `invoke` is the single admission point (safety
  net → skill surface → autonomy mapping → park/execute → before_tool hooks →
  `spec.run` → after_tool hooks → `shapeToolResult`). `listVisible()` and
  `listRegistered()` both return everything registered today.
- `src/tools/agent-tools.ts`: `effectiveToolNames` is THE narrowing used both
  to build the executable AgentTool list and to compute the worker's attested
  signature (`src/engine/worker-tools.ts:attestedToolSignature`). Dispatch
  refuses a worker whose signature differs from the orchestrator's
  expectation. Any placement change must flow through this function.
- Skill activation is keyed on `spec.name === ToolNames.Context`
  (`agent-tools.ts:203`), and the pending-skill policy is mutated inside
  `context(scope="skills")` (`src/tools/context/index.ts`, `runSkillsScope`).
- Skill tool-surface exemptions: `context` and `ask_user`
  (`src/core/skill-activation.ts:153`).
- Loop guard counts admitted calls at `before_tool` (`src/engine/loop-guard.ts`
  around line 1121, `count += 1`); a nested call made by a gateway body would
  be counted a second time unless marked.
- Prompt: `src/domains/prompts/compiler.ts:renderToolContractBlock` lists
  `Direct tools:` from `inputs.toolNames`, names `verify`/`git` for
  validation, and points at `context(scope="docs")` for tool usage.
- Presentation: `src/tools/presentation.ts` (fold policy by name),
  `src/interactive/renderers/tool-execution.ts:summarizeArgs` (special-cases
  `web_fetch`), `src/domains/safety/call-target.ts:CALL_ACTION_VOCABULARY`
  (verb/object per tool for approval cards and worker telemetry).
- Ledger consumers keyed on tool names (must learn to unwrap a gateway call):
  `src/domains/session/session-artifacts.ts:3,27,77` (`artifact|write|edit`),
  `src/domains/session/handoff.ts:332` (`READ_LEDGER_TOOLS` includes
  `artifact`), `src/domains/context/working-set/path-index.ts:120-131`
  (`TOOL_OPS`, `artifact`→write, `git`→bash), `src/domains/context/worker/pressure.ts:98`
  (evicts `web_fetch` observations), `src/domains/safety/finish-contract.ts:283-300`
  (mutation paths per tool via `toolMutationPaths`), `src/domains/evidence/build.ts:596`,
  `src/cli/skills-eval.ts:855`, `src/interactive/tasks-overlay.ts`.
  Middleware hooks (`watchdog.ts:41`, `injection-screen.ts:14`) fire on the
  inner tool name because the inner call runs through `registry.invoke`; they
  need no change if the gateway delegates through the registry.
- Safety keyed on names: `src/domains/safety/action-classifier.ts:baseClassify`
  (table), `writePathClass`, `extractWritePath` (artifact default path),
  `webFetchIsOutward`; `src/domains/safety/policy-engine.ts:151-176`
  (`EXECUTION_TOOLS`, `WRITE_ROOT_TOOLS`, `pathPolicyTargets` at 626-660).
- Recipes declare tool lists in frontmatter (`src/domains/agents/builtins/*.md`
  `tools: {required, optional}`): `git-master` requires `git`; `coder`,
  `documenter` list `git`, `web_fetch`; `researcher`, `world-knowledge` list
  `web_fetch`; `src/domains/agents/spec.ts:305` requires `artifact` for the
  `artifact-write` capability class. `src/domains/dispatch/extension.ts:1661-1700`
  filters recipe tools (drops `web_fetch` when hermetic; keeps `extension_*`
  only for http runtimes) before attestation; line 5826 uses
  `allowedTools.includes(WebFetch)` as the "network allowed" fact.
- Settings v2 lives in `src/core/config.ts` (`ClioSettings = typeof DEFAULT_SETTINGS`,
  ~2200 lines); `integrations.projectResources.trustProjectImports` is the
  existing project-trust knob; extensions record trust at install time in
  `<config>/extensions/state.json` with content digests
  (`src/domains/extensions/state.ts`). Config-dir resolution: `src/core/xdg.ts`.
- Execution substrates: `src/core/bash-exec.ts:runBashCommand` (login-env
  snapshot, process group, 5 s TERM→KILL grace, 100 ms progress throttle,
  16 MiB hard cap that KILLS the child, `BASH_HARD_CAP_BYTES`) and
  `src/core/safe-exec.ts:runCommandVector` (allowlisted env, cwd pinned in
  workspace, 3 s grace, 600 KB default cap that kills the child). Two
  lifecycles already exist; the plan forbids a third, so `run_script` extends
  `runCommandVector` with a sink (see slice D).
- Observation envelope: `src/tools/observation.ts` (per-turn pool 192 KiB,
  per-call caps, offload to `<state>/scratch/<session>/<sha256>.txt`, exactly
  one notice line, JSON stub rule, `totalCount: null` renders as `N+`).
- Result shaping/offload: `src/tools/result-shaping.ts` (offload ≤ 10 MiB,
  bash offload ≤ 16 MiB), dispositions in `result-disposition.ts`.
- Tests: `tests/contracts/*.test.ts` is the fast gate lane (`pnpm run test`);
  `tests/extended/` runs in `pnpm run test:full`. Harness: `tests/harness/tmp-root.ts`
  (per-run TMPDIR, `CLIO_CODER_HOME` isolation), `scratch-env.ts`
  (`makeScratchHome`, `isolateClioEnv`). Tests that pin the surface:
  `tests/extended/prompt-prefix-layout.test.ts` (`FULL_TOOL_SURFACE` list
  includes `artifact`, `web_fetch`), `compact-prompt-contracts.test.ts`
  (`ALL_TOOL_NAMES`), `worker-attestation-surface.test.ts`,
  `tests/contracts/harness-extensions.test.ts` (extension tools registered
  direct and reachable in worker registries), `tests/extended/library-context.test.ts`
  (`context scope=library`), `tests/extended/tool-boundaries.test.ts`
  (`webFetchTool`), `tests/extended/evidence-tool.test.ts`.

Attached tool schema bytes per turn (measured with `wireParameterSchema`
stripping, `JSON.stringify({name, description, parameters})`):

| tool | bytes | tool | bytes |
| --- | ---: | --- | ---: |
| dispatch | 10656 | read | 988 |
| ask_user | 2093 | monitor | 961 |
| context | 1898 | find | 934 |
| tasks | 1668 | web_fetch | 894 |
| ledger | 1506 | git | 861 |
| bash | 1230 | limitation | 839 |
| grep | 1211 | panes | 773 |
| decide | 1065 | artifact | 735 |
| verify | 1020 | credential_present | 620 |
| code_nav | 990 | edit | 602 |
| steer | 528 | evidence | 455 |
| write | 369 | ls | 299 |

Total 33,195 bytes (about 8.3K tokens) of which `dispatch` is 32%. Moving
the plan's explicit gateway members (artifact, web_fetch, git, evidence,
credential_present) saves about 3.6 KB; the ORCHESTRATE plane is where the
real prompt weight is, and its placement is an open operator decision (§5).

## 3. Per-tool audit records

Format per tool: purpose · placement · contract · implementation findings
(file:line) · scientific integrity · disposition (status).

### read (`src/tools/read.ts`, direct)
- Purpose: bounded text/image file reads with pagination and citations.
- Contract: `path, offset, limit, tail, line_numbers`; observation envelope;
  images returned when the model supports vision.
- Findings: whole-file `readFileSync` (line 100) then `toString("utf8")` and
  `split("\n")` (129-131): peak memory 3-4× file size; tail also reads the
  whole file; hard refusal above 20 MB (82-88); no binary probe except image
  magic; invalid UTF-8 silently becomes U+FFFD; no file identity (bytes,
  mtime) in details; `totalBytes` is recomputed by re-encoding.
- Integrity: pagination is honest (tests `read-source-pagination.test.ts`),
  but a non-UTF-8 or binary file is shown as if it were text.
- Disposition: REDESIGN the reader. Windowed fd reads (forward newline scan in
  64 KiB chunks to `offset`; backward scan for `tail`), fatal UTF-8 decode of
  the returned window with the failing byte offset, NUL probe → refuse as
  binary with a hint (`data` capability or `run_script`), lift the 20 MB cap
  (cost becomes O(window)), `totalCount: null` above a line-count budget
  (count only when the file is ≤ 32 MiB, else report bytes and `N+`),
  `details.file = {bytes, mtimeMs}`. Keep every assertion in
  `read-source-pagination.test.ts`. Status: NOT STARTED.

### write (`src/tools/write.ts`, direct)
- Findings: `writeFileSync` in place (37), not atomic; reads the previous
  content whole for the diff (31); `mkdir -p`; trailing-newline note; no
  fsync; symlink target followed (fine, undocumented); mode preserved only
  because truncate-in-place keeps the inode.
- Disposition: REPAIR. Atomic publish: temp file in the target's real
  directory, fsync, rename onto the realpath target (so a symlinked path keeps
  its target), copy mode bits; skip the diff above 1 MiB and say so; refuse
  a directory target; `details.file = {before: {bytes, mtimeMs} | null,
  after: {bytes, mtimeMs}}`. Status: NOT STARTED.

### edit (`src/tools/edit.ts`, `edit-diff.ts`, direct)
- Findings: `readFileSync(path, "utf8")` (78) turns invalid bytes into U+FFFD
  and writes them back (88): silent corruption of non-UTF-8 files; binary not
  refused; non-atomic write; fuzzy matching normalizes quotes/dashes/NFKC
  (`edit-diff.ts:61-72`) only after an exact miss (acceptable, document); no
  external-change detection between the model's read and the edit.
- Disposition: REPAIR. NUL probe and fatal UTF-8 decode before applying
  (refuse with offset); atomic publish as write; `details.file` before/after
  identity so ledger consumers can see drift. Status: NOT STARTED.

### bash (`src/tools/bash.ts`, `src/core/bash-exec.ts`, direct)
- Findings: 16 MiB cap kills the child (`bash-exec.ts:356-358`); output held
  in memory as strings; model view concatenates stdout then stderr (not
  interleaved); progress throttled 100 ms; login env snapshot once per
  process; `output_policy` dispositions; observe-tools nudge once per session.
- Disposition: RETAIN with two repairs: the cap error names the byte counts
  and the offload path and points at `run_script` for streaming; document
  the cap as the contract (run_script is the streaming path). Status: NOT
  STARTED (small).

### grep (`src/tools/grep.ts`, direct)
- Findings: rg timeout discards collected matches and returns an error
  (250-256); rg exit 2 with matches (permission errors on some files) is
  treated as failure and all matches dropped (258-260) while exit 2 after
  `stop()` is accepted; rg stderr skip lines are never counted; fallback reads
  whole files ≤ 20 MB (322), skips unreadable/oversized/binary silently
  (318-326), ignores `.gitignore` (only `GENERATED_DIRS`), and walks
  synchronously (blocks the TUI); "No matches found" and "incomplete" are
  indistinguishable.
- Disposition: REPAIR. Return partial results with
  `details.search = {complete, reason: "timeout"|"errors"|"limit"|"cancelled",
  skipped: {count, samples[]}}` and a notice line; count rg stderr skip
  messages; count fallback skips; make the fallback walk async; document the
  fallback's ignore semantics. Status: NOT STARTED.

### find (`src/tools/find.ts`, direct)
- Findings: fd + async fallback; mtime candidate cap already reported as
  approximate (good); unreadable directories skipped silently; symlinked
  directories never followed (both paths, undocumented).
- Disposition: RETAIN + add the same `details.search` incompleteness record
  and symlink documentation. Status: NOT STARTED.

### ls (`src/tools/ls.ts`, direct)
- Findings: `statSync` follows symlinks and entries that fail stat (broken
  symlinks) are dropped silently (70-72): a dishonest listing; no symlink
  marker.
- Disposition: REPAIR. `lstat` then `stat`; render `name@ -> target`,
  `name@ (broken)`; never drop silently; count skipped. Status: NOT STARTED.

### code_nav (`src/tools/codewiki/*`, direct)
- Not audited in depth (index-backed reads; freshness contract exists in
  `tests/extended/context-map-freshness.test.ts`). Disposition: RETAIN; add
  a one-paragraph record after a read of `code-nav.ts` (629 lines).

### context (`src/tools/context/*`, direct, schema simplified)
- Findings: five scopes (workspace, docs, skills, library, recall); `docs`
  and `library` are Clio-internal browsing; skill activation lives in
  `runSkillsScope`; recall goes through the working-set fold.
- Disposition: REDESIGN the schema: keep `workspace|skills|recall`; move
  `docs` and `library` to gateway capabilities `clio_docs` and `clio_library`
  reusing `runDocsScope`/`runLibraryScope` (`docs-engine.ts:579,616`,
  `library.ts:344`); drop `kind` and the library meaning of `ref`; update
  the prompt compiler sentence that points at `context(scope="docs")`.
  Status: NOT STARTED.

### verify (`src/tools/verify/*`, direct)
- Findings: `compareNumeric` requires every named tolerance (AND,
  `numeric.ts:violatedTolerances`); relative undefined for zero reference;
  NaN/Inf always fail; no reference provenance in the report; perf baseline
  v1 has no environment; `runJudgedCheck` ignores `outputCapped`
  (`scripts.ts`), and the judged cap is the 600 KB safe-exec default.
- Disposition: REPAIR (slice C, fork running): `combine: all|any`,
  `nonFinite: fail|match`, provenance (`reference {path, sha256, bytes}`,
  actual sha256), `outputCapped` check with an explicit 32 MiB judged cap,
  baseline v2 with environment and a differing-fields report, a
  `judgement {execution, validation, scientificValidity}` record. Status:
  IN PROGRESS by fork C.

### evidence (`src/tools/evidence.ts`) · credential_present · git (`src/tools/safe-exec.ts`)
- All three are bounded and honest today (evidence 16 KB JSON with a
  parseable truncation stub; credential_present returns booleans only; git
  runs three argv vectors through safe-exec). Placement: GATEWAY (the plan's
  direct table omits them). Disposition: RETAIN behind the gateway. Note:
  `git-master` requires `git`; worker mapping in §4.3 keeps that working.

### web_fetch (`src/tools/web-fetch*.ts`)
- Findings: full HTTP (method, headers, body); outward classification when
  non-GET or body (`action-classifier.ts:214`); arXiv/repo-tree summaries
  for plain GETs; binary refusal; private networks need opt-in; 5 MB hard
  read cap; HTML→Markdown.
- Disposition: SPLIT behind the gateway: `web_read` (GET only, no headers, no
  body, read class, never outward) and `web_fetch` (full request, existing
  outward rules). One implementation. Status: NOT STARTED.

### artifact (`src/tools/artifact.ts`)
- Findings: terminal document writer, `terminate: true`, default path is a
  pure function of `kind` (safety layer predicts it), in-place
  `writeFileSync` (not atomic).
- Disposition: RETAIN behind the gateway with the explicit terminal contract:
  the gateway result must propagate `terminate`, `details.kind`,
  `details.paths`; atomic write like `write`. Status: NOT STARTED.

### extension_<id>__<name> (`src/tools/harness-extensions.ts`)
- Findings: schemas frozen at registry construction; per-call digest
  re-verification; JSON-in/JSON-out over safe-exec; `safetyCall` projects an
  argv vector to a bash command for the policy engine.
- Disposition: RETAIN, placement GATEWAY (hidden registration, same spec).
  `tests/contracts/harness-extensions.test.ts` asserts direct reachability
  and worker attestation; update to the gateway path. Status: NOT STARTED.

### ORCHESTRATE + INTERACT (dispatch, monitor, steer, tasks, ledger, panes, limitation, decide, ask_user)
- Not in the release's data path; not audited for scientific integrity.
  Placement: DIRECT pending the operator decision in §5 (the plan's table
  never names them; their admission (plan approval), attestation, TUI and
  prompt contracts are keyed on their names). Disposition: RETAIN.

### gateway (new)
- See §4.2. Status: NOT STARTED (MCP module in progress by fork A; data
  module by fork B).

### run_script (new)
- See §4.4. Status: IN PROGRESS by fork D.

## 4. Design decisions taken (with the reason; reverse only with a reason)

### 4.1 Placement table, made cheap to change
Add `placement: "direct" | "gateway"` to `ToolSpec` (default direct) and one
table `TOOL_PLACEMENT` in a new `src/tools/surface.ts`. `registry.listVisible()`
and `listRegistered()` return direct tools only; a new `listGateway()` returns
the hidden specs. Initial placement: direct = read, write, edit, bash, grep,
find, ls, context, code_nav, verify, run_script, gateway, plus the ORCHESTRATE
and INTERACT planes (open decision); gateway = artifact, web_read, web_fetch,
git, evidence, credential_present, clio_docs, clio_library, data,
extension commands, MCP tools.

### 4.2 Gateway mechanics
`gateway(op: "find"|"describe"|"call", capability?, query?, args?)`, plane
`gateway`, action class `read`, `executionMode: "sequential"`.
- `find`: bounded JSON list `{name, kind: builtin|extension|mcp, description
  (first sentence), actionClass}`; `query` filters. MCP servers connect
  lazily (initialize + tools/list, cached per session); untrusted project
  servers are listed with the exact `clio-coder mcp trust <id>` remedy and
  never launched.
- `describe`: full description + wire parameter schema + authority notes.
- `call`: `registry.invoke({tool: <capability>, args}, {...outerOptions,
  nested: true})`. The inner call carries its own action class through the
  same net → autonomy → park path (a write-class capability parks for
  approval exactly as a direct call would; `read-only` denies it). Result is
  the inner result with `details = {capability, ...innerDetails}`,
  `terminate` and `images` propagated. Telemetry stays on `gateway` with the
  capability in the action descriptor; ledger consumers unwrap through one
  helper (`effectiveToolCall(toolName, args, details)`).
- Loop guard: mark inner invocations (`options.nested`) so the worker cap
  and per-turn budget count the model's call once.
- Skill surface: exempt `gateway` at the outer check (find/describe are
  harmless); the inner call is checked under its own name.
- Workers: in `effectiveToolNames`, when a recipe's allowed list names any
  gateway-placed capability, the direct surface gains `gateway` and the
  gateway enforces `options.allowedTools` on `call`. Both sides compute the
  signature from the same function, so attestation stays consistent. Set
  `allowedTools` on the worker's invoke options in `src/engine/worker-runtime.ts:619`.
- MCP tool action class comes from the trust record (`actionClass` in
  `mcp-trust.json`, default `unknown`, which asks at every level except
  read-only where it is denied); a project server without a trust record is
  never spawned. Extension commands keep their execute class and bash
  projection.
- Registry policy: add `gateway` (and `run_script`, `web_read`, `clio_docs`,
  `clio_library`, `data`) rows to `TOOL_PLANES`, the classifier table, the
  builtin catalog metadata, presentation, and `CALL_ACTION_VOCABULARY`.

### 4.3 Names
Builtin capability names stay the tool names (`artifact`, `git`, ...);
extension commands keep `extension_<id>__<name>`; MCP tools are
`mcp_<serverId>__<tool>` (dynamic names, validated like extension names).

### 4.4 run_script contract (fork D implements the module)
Explicit `interpreter` from an allowlist of basenames resolved on PATH,
`script` inside the workspace (realpath, sha256 recorded), `args`,
`interpreter_args` (python gets `-u` by default, recorded in argv),
`cwd`, `timeout_ms`, `inputs`/`outputs` declared refs (provenance only,
never isolation), bounded `env`. Streams stdout and stderr to
`.clio-coder/runs/<runId>/{stdout.log, stderr.log}` through a sink added to
`runCommandVector` (one process lifecycle), writes `run.json` atomically on
every outcome, keeps the last 100 runs, returns bounded tails and a declared
outputs table, projects itself to a bash command for the policy engine
(so unrecognized scripts ask at auto-edit, run at full-auto).

### 4.5 Structured data (fork B implements the module)
Gateway capability `data` with `op: inspect|select|validate` over CSV/TSV,
JSON, JSONL; streaming, bounded memory; every result carries
`view {exact, sampled, converted}` and honest counts; large integers and
long floats reported, never rounded silently; sentinels counted, never
converted; refusals for invalid UTF-8, binary, unsupported format.

### 4.6 Web split, docs/library, artifact
As recorded in §3.

### 4.7 Documentation targets
`docs/guide/tool-usage.md` (every changed tool; new gateway, run_script,
data sections), `docs/architecture/prompt-envelope-and-tools.md` (planes,
placement), `docs/architecture/safety-model.md` (gateway is no longer
reserved; MCP trust; run_script projection), `docs/guide/configuration-reference.md`
(`mcp.yaml`, trust file, new tool arguments), `docs/architecture/artifact-placement.md`
(`.clio-coder/runs/`), `docs/process/scientific-validation.md` (verify
fields), `docs/process/documentation-guide.md` map row for the audit,
`CHANGELOG.md` Unreleased, `ROADMAP.md` v0.4.9 section (currently absent).
The audit records in §3 become `docs/process/tool-audit-v0.4.9.md` once
dispositions have landed (status column filled from git evidence).

## 5. Open decisions for the operator

1. Placement of the ORCHESTRATE and INTERACT planes (dispatch, monitor,
   steer, tasks, ledger, panes, limitation, decide, ask_user). Default taken:
   direct. Moving `dispatch` alone behind the gateway removes 10.7 KB from
   every turn's prefix but changes plan-approval ergonomics for weak local
   models (two-step find/describe/call for delegation).
2. Commit policy on `v049` (recommendation: one commit per landed slice).
3. Whether `bash` output beyond 16 MiB should stream to the offload file
   instead of killing the child (default taken: keep the kill, improve the
   message, point at `run_script`).
4. MCP trust UX: `clio-coder mcp list|trust|untrust` CLI (planned) versus a
   `/mcp` slash surface (not planned for this release).

Operator decisions recorded 2026-09-16 by the coordinating session:
1. Placement: ORCHESTRATE and INTERACT planes stay direct.
2. Commit policy: one commit per landed slice on `v049`, after its review passes and typecheck, lint, and the slice tests are green.
3. bash cap: keep the 16 MiB kill; the error names byte counts and the offload path and points at `run_script`.
4. MCP trust UX: `clio-coder mcp list|trust|untrust` CLI plus an interactive `/mcp` slash surface, both this release (slice H owns `src/interactive/slash-commands.ts` for it).

## 6. Slice plan and orchestration

Rules for every slice: exclusive file ownership (listed), tests in
`tests/contracts/` for correctness and `tests/extended/` for stress,
`pnpm run typecheck` + `pnpm exec biome check <files>` + `pnpm test:file
<tests>` before reporting, no commits unless the operator has authorized
them, repo prose rule (no `[noun] - clause` dash constructions), tabs.
Reviews: an independent medium-effort reviewer per slice reads the diff
against the acceptance list below and the audit record; the orchestrator
integrates and runs `pnpm run ci` before any commit.

| id | slice | owner suggestion | files (exclusive) | acceptance | status |
| --- | --- | --- | --- | --- | --- |
| A | MCP stdio client, config, trust | fork running | `src/domains/gateway/mcp/**`, `tests/contracts/mcp-*.test.ts`, `tests/fixtures/mcp-fake-server.mjs` | framer caps, init/list/call, timeouts, close kills group, config validation, digest-bound trust | COMMITTED d7b0edee after four review rounds (46 tests green) |
| B | data module | fork running | `src/tools/data/**`, `tests/contracts/data-*.test.ts`, `tests/extended/data-stress.test.ts` | streaming, `view` honesty, precision issues, refusals, RSS bound | COMMITTED 7623ce27 after review PASS and test hardening (63 tests green, stress lane stable across three runs) |
| C | verify contracts | fork running | `src/tools/verify/**`, verify tests, `src/cli/verifiers.ts` (baseline only) | combine/nonFinite fields, provenance, outputCapped, baseline v2 env, judgement record | COMMITTED 2968271a after review PASS (70 verify tests green; the host provenance assertion completes with slice I) |
| D | run_script + safe-exec sink | fork running | `src/core/safe-exec.ts`, `src/core/run-records.ts`, `src/tools/run-script.ts`, `tests/contracts/safe-exec-streaming.test.ts`, `tests/contracts/run-script.test.ts` | sink streaming without kill, manifest, outcomes, abort, sweep, progress | COMMITTED 4ef9277e after D6 blocking-closure PASS WITH NITS and D7 final PASS; 72 D tests plus 1 Windows-only skip; coordinator final typecheck/Biome and 118 combined tests green. |
| E | read windowed reader | next | `src/tools/read.ts`, `tests/extended/read-source-pagination.test.ts` (keep), new `tests/contracts/read-large-files.test.ts` | §3 read disposition | COMMITTED 30826041 after review PASS on closures (42 read tests plus 67 consumer tests green) |
| F | write/edit atomic publish | next | `src/tools/write.ts`, `src/tools/edit.ts`, `src/tools/file-mutation-queue.ts`, new `tests/contracts/mutation-atomicity.test.ts` | §3 write/edit dispositions | COMMITTED 82ebee28 after review PASS (23 contract tests, 91 across consumers) |
| G | grep/find/ls completeness | next | `src/tools/grep.ts`, `find.ts`, `ls.ts`, `spawn-hygiene.ts`, new `tests/contracts/search-completeness.test.ts` | §3 dispositions; TUI stays responsive (async fallback) | COMMITTED 17e2de0b after three review rounds (22 contract tests plus extended lifecycle green) |
| H | gateway core | after A/B land | `src/core/tool-names.ts`, `src/tools/surface.ts` (new), `src/tools/registry.ts`, `src/tools/agent-tools.ts`, `src/tools/gateway/**` (new), `src/tools/policy.ts`, `src/tools/builtin-tool-catalog.ts`, `src/tools/presentation.ts`, `src/domains/safety/action-classifier.ts`, `src/domains/safety/policy-engine.ts` (targets), `src/domains/safety/call-target.ts`, `src/core/skill-activation.ts` (exemption), `src/engine/loop-guard.ts` (nested), `src/engine/worker-runtime.ts` (allowedTools option), `src/tools/core-bootstrap.ts`, `src/tools/bootstrap.ts`, `src/tools/harness-extensions.ts` (placement), `src/tools/web-fetch*.ts` (web_read), `src/tools/context/**` (schema), `src/domains/prompts/compiler.ts` (one sentence), ledger consumers listed in §2, `src/cli/mcp.ts` (new) + `src/cli/index.ts` (one row), tests: `tests/contracts/gateway-*.test.ts`, updates to the surface-pinning tests in §2 | direct and gateway invocation yield identical decisions and evidence; `artifact` via gateway terminates the turn and shows in `/view`; worker with `git` in its recipe attests and runs `gateway→git`; untrusted MCP never spawns | COMMITTED 021ec049 after H3 closure PASS; 177 reviewer tests green; coordinator typecheck, 59-file Biome and 118 combined final tests green; ownership-aware MCP exit included. |
| I | registration of run_script and bash message | after D | `src/core/tool-names.ts` (shared with H: sequence after H or same owner), `policy.ts`, catalog, classifier, `core-bootstrap.ts`, `src/tools/bash.ts` | run_script attached direct; policy drift assertion green | COMMITTED bde78f76 after review PASS (40 tests green across bash cap, mcp CLI, host verification, slash) |
| J | docs, changelog, roadmap, audit doc | last | files in §4.7 | every changed contract documented from source; `docs/process/tool-audit-v0.4.9.md` with status per tool | COMMITTED 4f775e16 after J closure PASS; 32 individual audit records, 14 Markdown targets, corrected cross-page calls, and prompt integration repair K; known global hygiene failures proceed to release-gate repair. |

| K | prompt migration integration repair | Codex v049-hygiene | `src/domains/prompts/fragments/identity/docs-routing.md`, `operating/skills.md`, `src/domains/prompts/compiler.ts`, `tests/contracts/gateway-prompt.test.ts` | compiled prompt routes through clio_docs and contains no retired docs/library context call | COMMITTED cbf55fa7 after independent PASS and coordinator typecheck/Biome/20 prompt tests PASS; retired docs/library instructions removed with availability-gated guidance. |

| L | release hygiene repair | Codex v049-hygiene | unused-export files in core/tools, file-mutation-queue namespace, scripts/check-hygiene.ts prompt assertion | lint green without suppressed checks or fake references; enforce new gateway prompt contract | COMMITTED bca5f101; development gates all PASS: fast 590 pass / 1 skip, full 2446 pass / 1 skip, CI root 590 pass / 1 skip and web 24 pass; initial lint/full failures preserved and resolved. |

| M | full-suite artifact/documenter integration repair | Codex v049-hygiene | headless-artifact extended-smoke and documenter-recovery tests; narrow dispatch/evidence source if needed | preserve real terminal artifact/evidence and recovery behavior; no weakened assertions | COMMITTED fe87b694 after independent PASS; 13 repaired scenario tests and 103 related tests pass; no production changes, weakened assertions, skipped cases or enlarged budgets. |
| N | library portability contract repair | Codex v049-docs | `tests/extended/library-portability.test.ts` | current canonical library contract tested without obsolete local symlink assumptions | COMMITTED 58cdeb0f after independent PASS; 54 targeted tests, library:check, typecheck and scoped Biome PASS; no checkout-local .agents directory created. |

| O | local version cut and candidate qualification | Codex v049-docs plus coordinator | package.json, ACP registry metadata, CHANGELOG.md, README.md, roadmap status; coordinator qualification evidence | version 0.4.9 only after green development gates; clean candidate and exact-package qualification per docs/process | LOCAL 0.4.9 CUT in this release commit after metadata review PASS; all development gates PASS; exact qualification is recorded by the source-bound external receipt named in v049-release-gates.md; no remote publication. |
| P | fresh Astra closeout review and MCP repairs | Codex v049-final-review, Astra XHigh | MCP client and gateway adapter, focused contracts; exact ownership in closeout report | resolve reproduced release integration bugs and pass independent closure review | COMMITTED dab9abc4 after independent precision closure PASS; malformed results, literal-preserving structured evidence and namespace ownership repaired; 50 independent MCP tests and 2 Node22 raw-wire tests pass; full lint/hygiene PASS. |
| Q | live model reasoning compatibility | Codex v049-final-review, Astra XHigh | provider model metadata and reasoning normalization if a source fix is required | blade-gateway Qwopus must not send unsupported high effort when route accepts low, medium and xhigh | COMMITTED in this closeout slice after independent PASS; exact Qwopus route forwards low/medium/xhigh, high and max normalize to xhigh; live response and regressions PASS; provenance wording qualified. |

Orchestration shape the operator asked for: keep the coordinator's context
small; give each slice to a medium-effort subagent (Fable 5.1 medium) or to a
Codex pane in yolo mode through herdr for mechanical implementation, and use
a medium-effort reviewer (astra or Fable) on each diff with the acceptance
list; the coordinator only integrates, resolves conflicts, runs gates, and
updates this file's status column.

## 7. Fork slices launched by the audit session (check their state first)

Launched 2026-09-16 as forks of the audit session with file-exclusive
specs identical to rows A-D above. Each was told to run only its own tests,
typecheck, and biome, and to report its exported API and test counts. Their
reports were not available when this file was written; whatever exists under
their paths at takeover time is their work in progress or their finished
state. Verify with:

```bash
git status --short
pnpm run typecheck
pnpm test:file tests/contracts/mcp-stdio-client.test.ts tests/contracts/mcp-config-trust.test.ts \
  tests/contracts/data-csv.test.ts tests/contracts/data-json.test.ts tests/contracts/data-jsonl.test.ts \
  tests/contracts/verify-numeric-boundaries.test.ts tests/extended/verify-numeric.test.ts tests/extended/verify-perf.test.ts \
  tests/contracts/safe-exec-streaming.test.ts tests/contracts/run-script.test.ts tests/contracts/harness-extensions.test.ts
```

A slice whose tests are absent or failing is unfinished: re-dispatch it from
its row in §6 with the acceptance list, do not patch it by hand in the
coordinator.

## 8. Gates

```bash
pnpm run typecheck && pnpm run lint && pnpm run build && pnpm run test   # fast lane
pnpm run test:full                                                       # before the release cut
pnpm run ci                                                              # what CI runs
```
