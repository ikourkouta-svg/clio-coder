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


## Operator-requested TUI iteration, 2026-09-16

The operator reopened work after the qualified `1b033d83` closeout and requested live dogfooding and human ergonomics improvements. The coordinator used medium-effort Codex workers in a separate Herdr tab, independent headless Astra reviews, and the actual Clio TUI beside the coordinator. The frontend-design skill informed a restrained terminal workbench design using existing semantic tokens. The prior qualified candidate remains identifiable by its commit; it does not qualify this new source.

R landed as `236e92a5`, S as `c175855b`, and T as `46a113d9`. U documentation passed independent standards/specification review and accompanies this record. Every source slice passed independent closure before its commit. Source and documentation ownership have returned. Exact qualification of the resulting clean candidate is established only by the external source-bound receipt below, after this prequalification checkpoint is committed.

| Gate | Result and retained evidence |
| --- | --- |
| Frozen install after the additive Input patch | PASS, exit 0, 1.920 s. `gate-install.json`. Only the existing patch hash and its references changed; R2 also independently applied the patch to integrity-verified pristine pi-tui 0.85.1 and compared all patched files. |
| Intermediate CI | PASS, exit 0, 159.084 s. 649 root tests passed, 1 Windows-only skip, 24 web tests passed. `gate-ci.json`. This precedes S2/T2 review repairs and is not the final gate. |
| Final `pnpm run ci` | PASS, exit 0, 158.534 s. Typecheck, lint, all hygiene checks, build, 663 root tests and 24 web tests passed; 1 Windows-only skip. `gate-ci-final.json`. |
| Final `pnpm run test:full` | PASS, exit 0, 117.481 s. 2526 total, 2525 passed, 1 Windows-only skip, 0 failed. `gate-full.json`. |
| Independent R2 closure | PASS. 46 focused tests, customized keybindings, atomic undo/kill ring, hostile provenance, and pristine patch applicability. |
| Independent S2 closure | PASS. 83 Library tests, 16 keyboard-routing tests, semantic colors, search precedence, correct package/entry/member footer units, and 36 production frames. |
| Independent T2 closure | PASS. 147 focused tests, real presentation/editor pipeline at 40/44/60/92/120 columns, hostile identity/path handling, current activity, and honest compact trust disclosure. |
| Independent U documentation review | PASS on standards and specification. No remaining findings; 16 local link targets verified. |

Lint retains its existing two warnings and two informational findings; the web build retains its non-fatal large-chunk warning. No checks were suppressed. The single platform-specific skip does not establish Windows behavior, and no macOS execution was performed.

### Failed attempts and their closure

R's initial independent review failed because Ctrl+U synthesized a configurable Ctrl+E movement. With line-end remapped to End, the reset left `filter: DEMO-REPORT` unchanged. R2 adds one semantic Input clear operation and verifies full text/cursor restoration, yank, replacement/undo, and empty-clear behavior. Its independent closure passed.

T's initial independent review failed because the production model label was abbreviated before the composer received it, causing long-placement models to collide, and because raw grapheme segmentation could expose an OSC title payload after truncation. The independently reproduced output included `xxxxxxxxxxx…ODEL_NAME\u0007-q6`. T2 passes raw structured identity to rendering and sanitizes before measuring or segmenting. Production-path and hostile-text regressions passed independent closure.

S initially passed with three nits. S2 preserves trusted state colors while sanitizing external fields, qualifies notice-return instructions by search focus, and supplies explicit count units to the shared footer without changing its other callers. All three findings passed closure. Intermediate test-fixture typing and assertion failures were corrected rather than suppressed; their full outputs remain in the worker reports and scratch logs. Both integrated CI attempts and the final full suite exited 0.

### Live outcomes and limits

The actual Herdr TUI was exercised at approximately 43/44 columns and at wide split-pane sizes. `/view DEMO-REPORT` now shows 1 of 174 resources with a visible basename, Enter shows the report, and `i` shows full recorded path/session/turn provenance. Ctrl+A followed by Ctrl+U clears to 174 of 174; one Ctrl+underscore undo restores the query and its single result. A Unicode two-line draft survived Library open/close. The final 43-column composer retains the model family, q6 suffix and low thinking level; the original pane ratio was restored after inspection.

Library clearly separates one provider package from eight notices, and Installed exposes eight core agents and three fleets with availability. Notice return preserves browsing context. Fleet selection without a required task variable honestly failed preflight without dispatch. Supplying the task opened a four-wave route/policy/budget approval preview; Escape cancelled it. Actual fleet execution was intentionally not performed.

Two real read-only Qwopus debugger runs completed and reported the exact first line and two-line count of notes.txt. Execution success and absence of validation remained distinct. The later large-log tail task FAILED overall: attempts `x59nhzrg0gkh` and `217gknt4vp8k` failed with HTTP 500 `proxy error: Could not establish connection`; configured retries remained on the same route. Attempt `2ldf0qsfzoh7` failed with `result contract failed after 2 bounded repair rounds: Debugger result payload failed: result must be valid JSON`. A healthy gateway target probe does not establish health of that model backend. No passing outcome is inferred from the partial read calls.

An OpenRouter one-run read-only smoke on `nex-agi/nex-n2.5-pro:free` succeeded in 3.987 s with `OPENROUTER_READY`. Its startup diagnostic separately reported that the saved Qwopus worker route advertises no tool support; this metadata warning has not been established as the cause of the HTTP 500 failures. Credentials remain outside the repository and are not reproduced in the records. Further live session results are appended to the external dogfood record, without changing the qualified source.

Verbose provider-error/retry duplication, the raw JSON tail of some structured completed worker answers, narrow session-picker identity, and broader dashboard/launchpad composition remain explicit next-iteration work. This pass did not redesign provider retry policy, model result contracts, global state, or fleet execution. No remote push, tag, GitHub release or npm publication was performed.

All worker/reviewer reports, raw gate outputs, render captures, actual-pane captures and live provider outcomes are under `/tmp/clio-v049-tui-20260917-002416/`. Exact-candidate status is governed by `/home/akougkas/.cache/clio-coder/qualification/f2c0deba876681e1/qualification.json`, whose head and digest must match the clean candidate. Its receipt can record qualification without modifying the source it authenticates.


## Sustained maintenance closeout, 2026-09-17

The maintenance mandate supersedes an immediate version cut. Version remains 0.4.9 on local v049; no push, tag or publication. The starting clean source was 56a81065. Accepted source slices V through AE, principal closure after the operator stopped other Astras, all development failures and remaining limits are recorded in [the maintenance audit](v049-maintenance-20260917.md).

Final development CI passed with 849 root tests, one Windows-only skip and 24 web tests (161.077 s). Principal closure passed 70 cases. The complete root file set passed with four concurrent files: 2750 pass, one Windows-only skip, zero failures/cancellations (320.763 s). This includes installed-package/Chrome, ACP/process lifecycle and scientific stress tests. Node22.22.3 targeted coverage includes 207 earlier cases and 50 final closure/prompt cases; these are not a full platform matrix.

Earlier full runs failed from tmpfs exhaustion, a stale prompt-policy assertion, an overlong disk-backed Unix socket path, and Linux shutdown-fixture startup/process-disappearance races. Full logs are retained under /tmp/clio-v049-maintenance-20260917-100629/. No expectations, deadlines or functionality were removed. The final run uses a short private disk-backed temporary root and bounded file concurrency. See gate-final-full-bounded.json and report-principal-closure.md.

All tracked candidate documentation precedes the final clean commit and frozen installation. Exact qualification is established only by /home/akougkas/.cache/clio-coder/qualification/f2c0deba876681e1/qualification.json and its retained candidate.tgz, whose source and artifact digest must match the unchanged candidate. The prior receipt does not cover these maintenance changes. This prequalification source record does not claim a future gate result. No source edits, rebuilds, repacks or full-suite reruns follow a successful qualification.
