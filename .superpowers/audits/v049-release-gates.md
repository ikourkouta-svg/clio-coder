# v0.4.9 development gate evidence

Recorded by the successor coordinator on 2026-09-16 after the mandated development gates passed and before exact-candidate qualification. The version cut is authorized only after these gates. Remote push, tag creation, GitHub release, and npm publication are not authorized by this local release task.

## Completed development gates

| Gate | Result |
| --- | --- |
| `pnpm run typecheck && pnpm run lint && pnpm run build && pnpm run test` | PASS. Root tests: 591 total, 590 passed, 1 Windows-only skip, 0 failed. |
| `pnpm run test:full` after reviewed repairs | PASS. 2447 total, 2446 passed, 1 Windows-only skip, 0 failed. |
| `pnpm run ci` | PASS. Typecheck, lint, build, root tests (590 passed, 1 skip), and all 24 web tests passed. |

Lint retains the two pre-existing warnings and two informational findings. The build emits its non-fatal large-chunk warning. Linux results do not establish Windows or macOS execution behavior. No live Codex/Claude host interoperability probe or real-model campaign was performed; neither substitutes for these deterministic gates.

## Failed attempts and disposition

The first fast-lane attempt passed typecheck, then lint exited 1 with this diagnostic output:

```text
check-hygiene: product-namespace: src/tools/file-mutation-queue.ts:101: project state paths must use the clio-coder namespace
check-hygiene: export-hygiene: unnecessary export keyword in src/core: isAbortError, runRecordPaths
check-hygiene: export-hygiene: unnecessary export keyword in src/tools: abortedRefusal, canonicalDecimal, clampInteger, defaultColumnName, detectLineEnding, effectiveNumericCombine, effectiveNumericNonFinite, escapePointerSegment, reportedNumber, searchDiagnosticPath, withCommandJudgement
check-hygiene: prompts: identity.docs-routing must direct the model to call context(scope="docs") before answering, not merely note that docs exist
check-hygiene: 4 drift condition(s) found
```

Build and fast tests were skipped in that failed attempt. Repair `bca5f101` passed independent review, all 16 hygiene checks, 223 focused tests, and eight prompt-guard fixtures. The complete fast lane then ran successfully; the skipped steps were not left unexecuted.

The first full-suite attempt exited 1: 2446 total, 2439 passed, 6 failed, 1 skipped. Its failures were:

```text
headless-artifact.test.ts:123: false !== true (clean, recovered, recovered-gated)
headless-artifact.test.ts:258: post-tool context guard could not compact; compaction returned an incomplete history checkpoint
documenter-recovery.test.ts:220: 'error' !== 'ok'
library-portability.test.ts:137: ENOENT: scandir '.agents/skills'
```

The artifact fixtures invoked an unavailable direct capability repeatedly; the corrected fixtures invoke gateway and retain terminal, evidence, receipt, deadline, and recovered-gate assertions. The Scout cited its former test location. Repair `fe87b694` passed independent review, all 13 repaired scenarios, and 103 related tests. The portability test assumed checkout-local symlinks deleted by `a01edb61`; `58cdeb0f` replaces that assumption with canonical inventory and temporary optional-link coverage, with 54 targeted tests and library pin checks passing. Neither repair changed production source, skipped a failing case, or enlarged budgets. The subsequent full-suite run passed.

## Evidence locations and qualification

Full command output, duration, exit status, and commit metadata are in `/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad`:

- `gate-fast-initial.json` and its logs record the failed lint attempt and skipped stages.
- `gate-fast-repaired.json` and its logs record the green complete fast lane.
- `gate-full-initial.json` and its log record all six failures.
- `gate-full-repaired.json` and its log record the green full suite.
- `gate-ci-initial.json` and its log record green CI.
- `report-review-*.md` preserve failed reviews and subsequent closure verdicts.

Exact-candidate qualification is a separate step after committing the local version cut and installing with the frozen lockfile. Its authoritative receipt is `/home/akougkas/.cache/clio-coder/qualification/f2c0deba876681e1/qualification.json`, with tarball `/home/akougkas/.cache/clio-coder/qualification/f2c0deba876681e1/candidate.tgz` and checksum beside it. A receipt is valid only when its commit matches the unchanged candidate. Qualification removes any prior receipt before starting. This prequalification record makes no claim that qualification or publication has already succeeded; the external receipt records that result without changing the source it authenticates.


## Closeout after the operator demo (2026-09-16)

The disposable /usage slash-command demo was backed up outside the checkout and removed with operator authorization. It touched five tracked files and two untracked files only. Source returned to 4bbba6a9 before the fresh Astra XHigh review. The CLI usage-report command was preserved.

The fresh review found malformed MCP results accepted as successes, lost model-visible structured-only results, ambiguous overlapping server prefixes, and missing supported-effort metadata for the reported Qwopus route. The first independent closure failed P despite 85 passing tests: native JSON decoding followed by serialization rounded a raw large integer and decimal, converted 1e400 to null, and lost the sign of negative zero. The final repair retains numeric source tokens in normalized JSON and uses explicit literal tags in serialized evidence. Independent closure now passes P and Q. Q's documentation states that the downstream high rejection is consistent with an incompatible deployment default; the precise upstream cause was not inspected.

Final precision validation passed 60 affected tests on Node 24.20.0, plus two raw-wire tests on Node 22.23.2, typecheck and scoped lint. The independent reviewer separately passed all 50 MCP client/gateway tests, two Node22 raw-wire tests and supplementary protocol assertions. Exactly Node 22.19.0 and non-Linux platforms were not executed. Full lint passed all 16 hygiene checks, with the existing two warnings and two informational notices. New regression and formatting failures are retained in the logs.

Before these fixes, release:preflight exited 1 with: `Qualified artifact or current package bytes changed. Run pnpm run ci:release.` The retained candidate tarball still matched the old receipt; ignored package/build bytes had changed during the demo. Neither that receipt nor the old development results qualify these new commits. Final exact-candidate qualification runs after the closeout commits; its external receipt is authoritative. The full development suite is not repeated for these bounded closeout changes; affected regressions and the complete qualification gate provide the new validation. Live TUI testing is separate evidence and is not claimed complete here.

Closeout briefs, before/after logs, both failed and passing independent reviews, and the demo backup live at `/tmp/clio-v049-closeout-20260916-175749`. Key reports are `astra-review-fix-report.md`, `closure-review-report.md`, `precision-fix-report.md`, and `precision-review-report.md`. Gate output is recorded alongside them. No remote push, tag, GitHub release, or npm publication is authorized or performed.
