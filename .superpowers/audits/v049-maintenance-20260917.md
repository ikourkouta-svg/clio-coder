# v0.4.9 sustained maintenance - 2026-09-17

This maintenance preserves version 0.4.9 and the binding A-U decisions. It does not authorize publication, tags, pushes, dependency upgrades, new features, billing changes or persistent model-default changes. Start: clean `v049` at `56a8106551e54b35dc7c72bb27eebed9493d37bc`. No unrelated user work was observed or discarded. Retained briefs, reports, reproduction results and full logs are archived at `/home/akougkas/.local/state/clio-coder/maintenance/v049-20260917/maintenance/`. At the operator-requested release-prep cleanup, disposable workspaces, private test homes, fake providers and executable experimental harnesses were removed. Checked-in regression tests and the operator's real state were preserved. See [the current release handoff](v049-release-handoff.md).

The coordinator used medium-reasoning Codex workers in three owned herdr panes, independent headless Astra XHigh reviewers with separate Standards/Specification inspections, and an independent read-only lifecycle investigator. Workers had explicit file ownership; only the coordinator committed, built, installed or ran broad gates. Unrelated user tabs were left alone. At closeout, runtime inspection showed the old Clio pane/process was no longer present; a new app pane was created beside the coordinator. This record is a prequalification source document: only the external receipt can establish qualification of its final committed source.

## Accepted changes and evidence

| Slice | Concrete behavior | Local commit / review |
| --- | --- | --- |
| V | Stale addressed worker steering retains its draft and cannot become a main-agent prompt. | `cb8e08bd`; VY PASS |
| Y | HTTP probe timeout/caller cancellation owns response bodies and unread-response cleanup. | `8e2f6b38`; VY PASS |
| W | Bounded actionable provider diagnostics identify the provider retry layer; replay cannot put Done on an earlier failed/cancelled turn through intermediate tool use. | `0062e595`; WZAA W PASS |
| X | Complete UTF-8 writes, failed-append rollback and pending fsync survive errors; unsupported/corrupt resume is admitted before parking the current session. | `230cc1c8`; X2 PASS, 69 reviewer tests and retained probes |
| Z | Narrow picker rows prioritize task identity; filtering/undo/custom confirm preserve the selected session. | `e96e1c22`; WZAA Z PASS, 19 actual-overlay tests |
| AA | Verified receipt admission, exact numeric-source fallback and complete-object previews preserve checkpoint prose. | `abfba708`; principal closure after independent findings |
| AB | Installed-skill guidance agrees with existing autonomy; marketplace and mandatory lookup policy unchanged. | `badbbceb`; ACAB PASS plus principal full-suite assertion synchronization |
| AC | Native embedding/rerank capability requests retain body deadlines; fallback only after completed endpoint-unavailable responses. | `15966437`; ACAB PASS |
| AD/AE | Owned queued/admitting/running retries drain before fleet resource release; independent repairs retain distinct controls. | `d206d13a`; principal closure after independent P1 findings |

Review source fingerprints were checked against successful source-stable CI and checked again before acceptance. Initial review failures were retained and repaired. At the operator's explicit request to stop other Astras and conserve usage, all other maintenance agents were stopped. The coordinator completed the AA/AD/AE closure review and documentation review, including unchanged independent reproductions and production adapter tests. Those are principal reviews, not new headless independent verdicts. No gate expectations were weakened to accept a failure. Full reports: `report-review-VY.md`, `report-review-W.md`, `report-review-X.md`, `report-review-X2.md`, `report-review-WZAA.md`, `report-review-ADAE.md`, `report-review-ACAB.md`, and `report-principal-closure.md` in the maintenance evidence archive.

## Coverage and limits

| Area | Examined or exercised | Status and remaining limits |
| --- | --- | --- |
| A Providers | Shared/native HTTP body deadlines, abort, cleanup, endpoint fallback/status, reasoning response cleanup, real route/read task, concise errors/retry exhaustion | Focused verified paths; gateway connectivity/model listing does not establish every model's tool capability |
| B Harness | Compiled permission guidance and actual activation policy; real read task's context overhead | Deterministic policy repair; no claim of stochastic model improvement; mandatory first-turn lookup preserved |
| C Agents/fleets | Stale steering, partial startup, cancellation, late handles, actual adapter retries, member identity, completed result contracts, two-worker TUI fleet | Verified targeted lifecycle paths; no SSH/remote host or actual orphan OS process claim from in-process race fixtures |
| D Tools/MCP/science | Reused prior audits plus MCP direct/gateway precision, CSV/JSON/JSONL, numeric verification, script manifests, atomic mutations | 196 targeted tests pass / 0 skip; large integers, long decimals, 1e400 and negative zero protected; not a fresh exhaustive tool audit |
| E Persistence | Append/replace failures, metadata/version/replay admission, descriptor reuse, fsync retry, actual exit/resume | Single-owner fault injection; no power-cut, network-FS or concurrent external writer claim |
| F TUI | Actual Library/View, picker, Fleet Runs/details, dashboard, launchpad, editor drafts, Unicode, width changes, failure/recovery/cancel/export/resume | Existing R/S/T evidence reused; final rebuilt two-member fleet passed; terminal emulators/platforms not exhaustively tested |
| G Performance | Diagnostic projection at SDK-sized and synthetic large inputs; compiled prompt byte count | Measured local work only; no startup/end-to-end/provider speedup claim |
| H Maintainability | Descriptor/resource/control ownership, error causes, canonical policy reuse and bounded shared presentation | Scoped repairs; no dependency changes, wholesale rewrite or unrelated formatting |

"Inspected" is not a correctness verdict. The detailed chronological ledger and ownership checkpoints are `maintenance-ledger.md` and `checkpoint.md` in the maintenance evidence archive; the binding live slice tracker is `v049-handoff.md` beside this file.

## Development validation

- Scientific/MCP protection: 196 pass, 0 skip, 10.156 s (`gate-science-protection.json`).
- First CI failed typecheck: optional capture/array access and recursive inference in new tests/source; fixed before review. Repaired CI passed in 149.433 s: 714 root pass/1 Windows-only skip, 24 web pass.
- Intermediate second-cycle typechecks failed new optional-probe and event/timer fixture typings; explicit narrowing fixed them. No behavioral assertion or skip was weakened.
- Source-stable second-cycle `pnpm run ci` passed in 164.751 s: 837 root pass/1 Windows-only skip, 24 web pass, types/lint/hygiene/build. `gate-cycle2-ci.json` records before/after SHA256 manifests.
- Node 22.22.3 targeted compatibility: 207 pass / 0 skip across session/editor/picker, provider lifecycle and fleet/prompt/presentation logs. Main development used Linux, Node 24.20.0 and pnpm 10.34.5. This is not a full Node 22 or Windows/macOS qualification.
- Corrected final development CI passed in 161.077 s: 849 root passes, one Windows-only skip and 24 web passes. All source fingerprints were stable. Its first attempt failed one unfinished test-wrapper return type; returning the existing release result fixed the fixture without changing assertions.
- Principal closure: 70 cases passed, including retained independent failure reproductions and production retry/identity controls. A separate original retry-escape reproduction now confirms no live continuation after parent release.
- First full suite: 2730 passed, eight failed, six cancelled, one skipped. The 4 GB `/tmp` tmpfs ran out of space, causing fixture/state writes to fail. The compete fixture failed its Git config write before entering cleanup, retained the environment lock and stalled later cases; its owned child was terminated. A separate old compact-prompt assertion still expected the policy contradiction fixed by AB. It now checks automatic installed activation at auto-edit and operator-only marketplace installation. Marketplace whitespace is not an incidental formatting constraint.
- All 65 affected tests passed on private disk-backed scratch, including 200 MB CSV and 100 MB JSON stress controls. No unrelated temporary data was removed.
- A second full run on disk-backed scratch finished in 110.711 s; its remaining six failures were Unix/Chrome socket path limits in the overly long temporary root. No product code changed. The final run uses a short private `/var/tmp` root with ample disk space.
- Fifty final closure/prompt tests also passed on Node 22.22.3 after the last source fixes.
- Short-root full run: 2748 passed, two failed, one skipped in 132.632 s. Both failures were in the existing Linux shutdown fixture: a child startup deadline under unrestricted test parallelism and ESRCH while reading a disappearing process. Its identity reader now treats only ENOENT/ESRCH as absent, preserving every shutdown assertion and deadline. The final complete run bounds concurrent test files to four; no tests are omitted.
- The final complete root suite passed: 2751 total, 2750 passed, zero failures/cancellations, one Windows-only skip in 320.763 s. Exact command: `env TMPDIR=/var/tmp/c49.zh0zxrhj node --import tsx --import ./tests/harness/tmp-root.ts --test --test-concurrency=4 tests/contracts/*.test.ts tests/extended/*.test.ts tests/smoke/*.test.ts tests/extended-smoke/*.test.ts`. This is the same full file set, with bounded concurrency. `gate-final-full-bounded.json` records stable source and the full log.
- Exact candidate qualification remains governed by its external receipt after this source record is committed.

Full command output and exit status are retained in `gate-*.log/json`, `typecheck-cycle2-*.log`, the Node 22 logs, and each reviewer/worker report. Existing nonfatal lint warnings and the web chunk warning remain visible. Test setup failures, fixture admission refusals and failed behavioral review cases are not reported as passes.

## Actual application and provider observations

A bounded real OpenRouter headless read task returned the exact first line and two-line count. It used three calls: mandatory skill discovery, file read, answer. First input was 11352 tokens; the skill observation was 12176 bytes before a 35-byte file. This one response establishes that journey only. Its prompt overhead is recorded, not used to reverse the previously evaluated mandatory lookup decision.

A real Clio TUI in a disposable workspace used a local deterministic HTTP provider for giant 503 errors, one configured provider retry, exhaustion, recovery, actual read-tool execution, result-contract failure/repair exhaustion, successful debugger output, Ctrl+C during a 40-chunk stream, another successful turn, export, exit and resume. Historical failures/cancellation retained their true outcome after replay; later successful work retained Done. Stale addressed steering kept its draft and did not append a new conversation turn. Real 43-column picker captures retained the task identity. Library navigation preserved a bracketed Unicode multiline paste; Escape restored the draft and one undo removed the whole paste. Before/after canonical ledger hashes and byte counts were identical.

The first debugger fixture returned the wrong result shape and honestly exhausted two repair rounds; this was corrected in the fixture, not relabeled as a product success. A valid two-member readonly fleet passed preflight/approval, executed concurrently against the local provider, and released its two request slots. Both receipt integrities verified and contracts passed; the final rebuilt repeat also completed and showed zero occupied slots; the board separately disclosed no scientific validation or independent review. Earlier malformed/versionless/non-Git/insufficient-capacity fixture attempts were refused before launch and retained as setup evidence. Only the private fixture's existing concurrency settings were adjusted.

The upstream SDK already truncates many error bodies around 4000 characters before Clio's canonical ledger. The presentation preserves complete available redacted diagnostics, not bytes discarded upstream. Actual export retains the SDK truncation marker. The initial suspicion that View caused the missing HTTP tail was withdrawn after reading the canonical ledger.

A configured blade-gateway probe succeeded for its default dynamo/qwen3.8-27b model and listed Qwopus. It did not establish Qwopus tool support or inference. No persistent operator route/capability override was made.

## Performance evidence

Linux/Node 24.20.0, one warmup, local projection only (`benchmark-W2.log`):

| Workload | Old projection | Final bounded projection | Interpretation |
| --- | --- | --- | --- |
| SDK-sized 4033 characters, 1000 calls | 0.058701 ms/call | 0.156541 ms/call | Safer sanitization/diagnosis costs about 0.098 ms locally |
| Synthetic 5,000,056 characters, 20 calls | 53.927504 ms/call | 0.140655 ms/call | Bounded scanning avoids full-input work; uncommon SDK path |

Compiled synthetic prompt size decreases by 27 UTF-8 bytes at read-only/suggest and 35 bytes at auto-edit/full-auto. These are bytes, not token counts or measured provider latency. Native delayed-body probes that previously ignored 50 ms deadlines and returned success around 394/366 ms now fail around 82/58 ms including preceding health checks; budgets remain per HTTP request, not one whole-runtime deadline.

## Remaining issues and follow-up

1. Existing session version 3 restamping has two metadata publications. Injected failure on the second can leave a refused candidate marked open/version 3; baseline and current behavior match, ledger bytes remain intact and retry reaches version 4. This is outside the closed normalization-failure requirement and needs a separately reviewed lifecycle transaction if pursued.
2. Qwopus configured capability metadata and observed tool-support claims remain unresolved without a targeted authorized live tool contract check. Gateway/model discovery is insufficient evidence.
3. Upstream SDK diagnostic caps and mandatory discovery overhead remain as documented above. No speculative SDK change, policy removal or larger prompt was added.
4. Windows/macOS, actual SSH/hosted fleets, real disk-full/power-cut/network filesystems and a complete model/provider matrix remain untested this session. Qualification's Linux/Chrome/package checks do not cover them.

## Exact qualification and use

Tracked documentation/status is completed in the accompanying documentation commit before frozen installation and `pnpm run ci:release`. Final qualification uses the same private disk-backed TMPDIR for temporary fixtures. The authoritative receipt is `/home/akougkas/.cache/clio-coder/qualification/f2c0deba876681e1/qualification.json`, with `candidate.tgz` and checksum beside it. Its source SHA and package digest must match the final clean candidate. This source record intentionally does not claim a future qualification result. No source edits, rebuilds, full-suite reruns or manual repacks follow successful qualification; read-only preflight is allowed. Final runtime/pane ownership and qualification results are recorded externally in the final checkpoint/handoff.

The separately committed Linux shutdown fixture repair recognizes a disappearing process without dropping any termination checks. The principal reviewed the final docs against the accepted source, actual pane captures, failure logs and successful gate manifests. Publication remains unauthorized.

Release-prep addendum: exact qualification and preflight passed at `0ba61280fc860ebcb158daf3b757969046d98e65` before the operator tried the final TUI. The later audit/handoff documentation commit changes candidate identity and requires fresh qualification. Historical receipts and logs are retained in the archive; they are not evidence for the successor SHA.
