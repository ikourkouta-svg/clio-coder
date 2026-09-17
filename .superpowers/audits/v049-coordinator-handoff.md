# v0.4.9 coordinator handoff

## TUI iteration checkpoint (2026-09-16)

The operator reopened work for live dogfooding and TUI ergonomics. R (`236e92a5`), S (`c175855b`) and T (`46a113d9`) are committed after independent closure review. U's design/guide/changelog integration passed independent review and accompanies this audit checkpoint. Final CI passed with 663 root tests, one Windows-only skip and 24 web tests. The full suite passed with 2525 tests and one Windows-only skip. See v049-release-gates.md for the failed initial reviews, repairs, actual live outcomes and deliberately deferred surfaces.

The latest large-log Qwopus worker demo failed after two backend connection failures and a final invalid result contract; this is not counted as a pass. Two earlier fixture workers passed. OpenRouter text smoke succeeded using the existing configured free route. The coordinator is finishing live checks using explicit session selection, without hiding route changes. All source owners have returned their files. Remaining immediate work is clean-candidate frozen install and ci:release, then final preflight and the two-pane live workspace. Exact qualification is authoritative only through the matching external source-bound receipt; this committed paragraph is a prequalification checkpoint.

Current scratchpad: `/tmp/clio-v049-tui-20260917-002416/`. Keep the coordinator/Clio pair in wR:t17; close only the temporary TUI worker tab when its work is finished. Other project tabs are unrelated. No remote publication is authorized.


## Fresh closeout status (2026-09-16)

The operator-authorized /usage demo was removed after a backup. A fresh Astra XHigh review found and repaired MCP result validation, structured-only numeric preservation, and overlapping server ownership; independent precision closure passed and P landed as `dab9abc4`. Q's measured Qwopus reasoning vocabulary and qualified provenance wording also passed independent review and land in the commit containing this update. The successful current-source live probe explicitly sent xhigh on the same route that previously failed with downstream high rejection. OpenRouter user credentials and an explicitly tested alternate free route were connected outside the repository.

The old ignored build output failed preflight after the demo, and the new fixes change the source candidate. Final qualification is pending after this clean closeout commit; only the source-bound external receipt can establish success. See `v049-release-gates.md` for the first failed precision review, passing closure, exact test evidence, skipped investigations, and closeout scratchpad. The coordinator next runs frozen install and ci:release, installs the existing qualified build locally without another build, and performs the live TUI walkthrough in the isolated scratch workspace. No remote publication is authorized.

## Successor coordinator status (2026-09-16)

The successor landed D as `4ef9277e` after D6 closed the blocking findings and D7 passed the final diagnostic closure review. H landed as `021ec049` after H3 passed the final process-group ownership closure. Both commits were made with passing typecheck, scoped Biome, and slice tests. The final coordinator integration run passed 118 tests with one Windows-only skip. H's final reviewer run passed 177 tests.

J passed its focused closure review after its 32 individual tool records and documentation contracts were checked. The documentation review found stale active prompt fragments; integration repair K landed separately as `cbf55fa7` after independent PASS and 20 passing prompt regressions. J's 14 Markdown files, the ignored roadmap, and audit records are included in the documentation commit containing this update. Its slice-table status records completion without a self-referential commit hash.

The development gates are now complete. The fast lane passed with 590 tests and one Windows-only skip. The first full suite exposed six obsolete fixture/layout assumptions; reviewed repairs N (`58cdeb0f`) and M (`fe87b694`) landed separately, and the full rerun passed with 2446 tests and one skip. CI passed with 590 root tests, one skip, and all 24 web tests. Hygiene repair L (`bca5f101`) passed independent review and all 16 checks without suppressions. See `v049-release-gates.md` for failed-attempt output, skipped stages, repairs, and evidence locations.

The local 0.4.9 cut is dated 2026-09-16 and passed independent metadata review. This is the prequalification checkpoint included in the local cut commit. After that commit, install once with the frozen lockfile and run `pnpm run ci:release` against the clean candidate. Qualification is authoritative only through the source-bound external receipt at `/home/akougkas/.cache/clio-coder/qualification/f2c0deba876681e1/qualification.json`. That external receipt records success without altering the source it authenticates. No remote push, tag, GitHub release, or npm publication has been authorized.

Both workers are idle after completing their assigned repairs and the metadata cut. All source and documentation implementation reviews passed before their commits. The full command and reviewer history remains in the scratchpad below.

The §6 status column in `v049-handoff.md` remains the live slice tracker. The original handoff snapshot follows for historical context; its pending D/H instructions have been superseded by the commits above.

---

Written 2026-09-16 by the Fable coordinator session at wrap-up. The successor
coordinator is a Codex session (gpt-6-astra, high effort) in herdr pane
wR:p2H of tab wR:t17 ("v049-workers"). Read, in order: v049-action-plan.md
(the mandate), v049-handoff.md (audit records in §3, binding design in §4,
operator decisions at the end of §5, slice table with a status column in §6),
then this file. Keep the coordinator's context small: dispatch workers and
reviewers, integrate, run gates, commit, update the status column.

## 1. Commits on v049 so far (base 66a5862c)

| commit | slice | subject |
| --- | --- | --- |
| 82ebee28 | F | fix(tools): publish write and edit atomically with honest file identity |
| 2968271a | C | fix(verify): make numeric and perf judgements explicit and inspectable |
| d7b0edee | A | feat(gateway): add a local stdio MCP client with digest-bound trust |
| bde78f76 | I | feat(cli): add mcp trust commands and honest bash cap reporting |
| 17e2de0b | G | fix(tools): report search completeness and list symlinks honestly |
| 7623ce27 | B | feat(data): add a streaming inspector for CSV, TSV, JSON, and JSONL |
| 30826041 | E | fix(tools): read files through bounded windows with honest identity |

Every commit contains only its slice's files, passed biome on those files, had
no typecheck errors in those files, and passed its slice tests. Commit policy
(operator): one commit per landed slice after its review passes. Conventional
commit subject, body in full sentences, repo prose rule (no "[noun] - clause"
dash constructions), no attribution trailers.

## 2. Uncommitted work in the tree and its next step

- **D (run_script and the safe-exec sink)**: fixes for the third-pass findings
  are DONE and unreviewed; the worker's standalone report is
  `/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/report-D4.md` (signal-time ESRCH now closes the cleanup window;
  SafeCommandResult.failure is always set and an incomplete teardown after exit
  0 is the unsuccessful run_script outcome "cleanup-incomplete"; 61 tests green,
  typecheck clean, 97 consumer tests green). Next: headless astra closure
  verification against `/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/report-review-D3.md` (write review-D4.md in the
  style of review-D3.md), then commit the five files on PASS:
  src/core/safe-exec.ts, src/core/run-records.ts, src/tools/run-script.ts,
  tests/contracts/safe-exec-streaming.test.ts, tests/contracts/run-script.test.ts.
  Gate: pnpm test:file on the two test files plus
  tests/contracts/antigravity-subprocess.test.ts. The D worker cannot be
  messaged again; further findings go to a fresh Codex worker with rules.md.
- **E (read windowed reader)**: COMMITTED by the outgoing coordinator after the
  closure verification passed (see the commit list; 42 read tests green).
- **H (gateway core, placement, registration)**: COMPLETE and unreviewed; the
  worker's full report is at `/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/report-H.md`
  (files touched in its §1, API in §2, test counts in §3, acceptance item by item
  in §4, decisions in §6, follow-ups in §7; hygiene drift conditions it saw are
  listed in §3 item 7 and belong to slices B, C, D, F, G). H owns the long file list in
  `/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/brief-H.md` (row H of the handoff plus src/tools/artifact.ts,
  src/domains/dispatch/extension.ts at the recipe sites, src/domains/agents/spec.ts,
  tests/contracts/gateway-*.test.ts, and the surface-pinning tests). Next: run a
  headless astra review against brief-H.md's acceptance list (write a
  review-H.md brief in the style of `/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/review-A.md` plus `/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/review-rules.md`),
  route findings to a fresh Codex worker, verify closures, then commit H with
  every file H touched (use `git status --short` after D and E are committed;
  everything left is H, apart from the .superpowers/audits/*.md files, which are
  committed last with J).
- **J (docs, changelog, roadmap, audit doc)**: not started. Brief ready at
  `/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/brief-J.md`; dispatch after H commits (Codex pane at medium effort is
  fine), review with astra, commit.

## 3. Release gates after J

```bash
pnpm run typecheck && pnpm run lint && pnpm run build && pnpm run test
pnpm run test:full
pnpm run ci
```

Known before running them:
- `pnpm run lint` runs biome and scripts/check-hygiene.ts. The A and D workers
  saw 3 hygiene drift conditions from new exports in src/core and src/tools
  (candidates: createProcessGroupCleanup and friends in safe-exec.ts,
  publishFileAtomically in file-mutation-queue.ts, search helpers in
  spawn-hygiene.ts). Read the script's rule and resolve by referencing or
  trimming exports; route to a Codex worker if it is more than a few lines.
- Baseline lint had 2 pre-existing warnings and 2 infos; the biome warning at
  src/interactive/slash-commands.ts:877 (noConfusingVoidType) is one of them.
- tests/contracts/search-completeness.test.ts takes about 11 s (the 5,000-file
  responsiveness case); acceptable, but say so in the release notes if asked.
- Version bump: package.json is still 0.4.8. Follow docs/process (see the
  v0.4.8 release commit c841a461 for what the process expects) and do the bump
  only as the release cut step, after ci is green.
- Update the status column in v049-handoff.md §6 at every step; the operator
  reads it.

## 4. Mechanics that work

- Scratchpad (briefs, review briefs, worker and reviewer reports):
  `/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/`. Files: rules.md (worker ground rules), review-rules.md,
  brief-{B,E,F,G,H,I,J}.md, review-*.md, report-*.md, report-review-*.md.
- Headless astra review (must close stdin or it hangs on "Reading additional
  input from stdin"):
  `setsid nohup codex exec --dangerously-bypass-approvals-and-sandbox -m gpt-6-astra -c model_reasoning_effort=medium -C /home/akougkas/iowarp/clio-coder -o "/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/report-review-X.md" "$(cat "/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/review-X.md")" > "/tmp/claude-1000/-home-akougkas-iowarp-clio-coder/f3b6cccc-3883-4329-8ddb-41061d3aa33d/scratchpad/codex-review-X.log" 2>&1 < /dev/null &`
  then poll for the report file. Reviews take 2 to 6 minutes.
- Codex workers in herdr panes (interactive, so findings can be sent back to the
  same session): tab wR:t17 has panes wR:p2E (slice-f session, slice committed),
  wR:p2F (slice-g, committed), wR:p2G (slice-i, committed), wR:p2H (the
  successor coordinator). Free a pane with `herdr agent prompt <name> "/quit"`,
  then `herdr agent start <name> --kind codex --pane <id> --timeout 90000 -- --dangerously-bypass-approvals-and-sandbox -c model_reasoning_effort=medium`,
  `herdr agent prompt <name> "<text>"` (no --wait for long work), and
  `herdr agent wait <name> --timeout 570000` to block until it settles. Ask
  the worker to write its report to a scratchpad file; pane reads wrap badly.
- Every worker brief states exclusive file ownership, no commits, gates before
  reporting (typecheck clean in owned files, biome, slice tests), the prose
  rule, and tabs. Every review verdict is PASS, PASS WITH NITS, or FAIL with
  file:line findings; FAIL goes back to the owner, then a closure verification.
- The Claude agents from this session (slice forks, H worker, E reviewer)
  cannot be messaged by the successor. Their results exist only as files.

## 5. Process-group policy set during integration (A and D share it)

Group signalling happens only inside a bounded cleanup window that starts at
kill time or at leader exit, stops permanently after the first ESRCH, and never
runs from a path after cleanup completed. Incomplete teardown (members still
present one second after SIGKILL) is reported (cleanupIncomplete, teardown
outcome) rather than hidden. The residual probe-to-signal window is accepted
and documented as shared with bash-exec.ts and the ACP transport. Docs (slice
J) must state this.
