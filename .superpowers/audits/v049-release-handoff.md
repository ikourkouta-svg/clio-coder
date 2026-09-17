# v0.4.9 release handoff for Claude Code

The operator has tried the final application and requested local consolidation, cleanup and release preparation. Continue from the current clean `v049` checkout at `/home/akougkas/iowarp/clio-coder`. This document accompanies the final closeout commit; resolve its exact SHA with `git rev-parse HEAD`. The preceding product/documentation checkpoint was `0ba61280fc860ebcb158daf3b757969046d98e65`. Version metadata is already 0.4.9 in both package.json and assets/acp-registry/agent.json, and the matching changelog section is dated 2026-09-16. Verify these facts before acting.

## Scope and ownership

- Finish release preparation, candidate review, required gates and an actionable release report. Preserve the reviewed product behavior and the existing commit series. There is no unfinished implementation slice to recover.
- The operator stopped other Astras because Codex usage was nearly exhausted. No maintenance workers remain active. Do not start Codex/Astra workers or revive historical worker assignments. Perform the remaining work in Claude Code.
- Routine investigation, scoped repairs, tests and local commits are authorized. Do not push, tag, publish to npm, create a GitHub release, alter billing, change persistent model defaults or discard unrelated user changes. Remote release operations require explicit maintainer authorization after the exact candidate is reviewable.
- No new features, dependency upgrades, broad refactors or version bump are requested. If a gate exposes a real defect, repair and review it, update the evidence, and commit before requalification. Do not weaken tests or expand skips.

## Read before proceeding

Read applicable AGENTS.md if present, CONTRIBUTING.md, CLIO-CODER.md, docs/process/release-cut-checklist.md and docs/process/development-pipeline.md. Read v049-coordinator-handoff.md, v049-action-plan.md, v049-handoff.md, v049-maintenance-20260917.md and v049-release-gates.md beside this document. The latest closeout paragraphs supersede old pending-work instructions. Preserve binding decisions in the original handoffs, including mandatory first-turn skill discovery, scientific numeric precision, trust boundaries and separation of execution from validation. Consult docs/architecture/tui-design.md if changing interactive behavior.

## Accepted local work

Maintenance began clean at `56a8106551e54b35dc7c72bb27eebed9493d37bc` and retained coherent reviewed commits:

| Commit | Repair |
| --- | --- |
| cb8e08bd | Stale worker steering cannot fall through into main chat; rejected drafts survive. |
| 8e2f6b38 | Shared HTTP probe deadlines and cancellation remain active through response bodies. |
| 0062e595 | Bounded provider diagnostics and accurate failed/cancelled replay outcomes. |
| 230cc1c8 | Complete session writes, rollback, fsync ownership and safe resume admission. |
| e96e1c22 | Narrow session-picker identity and stable selection/filter/confirm behavior. |
| 15966437 | Native provider probe and embedding lifetimes, with honest fallback. |
| badbbceb | Installed-skill guidance agrees with existing autonomy policy. |
| abfba708 | Readable verified worker results with complete underlying evidence and precision safeguards. |
| d206d13a | Fleet ownership survives partial startup, cancellation and member retries; controls address the correct member. |
| 78c04e67 | Linux shutdown tests handle disappearing process identities without weakening termination assertions. |
| 0ba61280 | Maintenance audit, release notes and qualification checkpoint. |

Independent reviews found real issues and drove repairs. After the operator stopped other Astras, the coordinator performed the final AA/AD/AE closure and documentation review. Those are principal closure reviews, not additional independent verdicts; see report-principal-closure.md. The original A-U work predates this table and remains part of the candidate.

## Evidence and cleanup

Durable private evidence root:

`/home/akougkas/.local/state/clio-coder/maintenance/v049-20260917/`

- `maintenance/`: coverage ledger, checkpoint, worker reports, independent review reports, principal closure, source fingerprints, all gate attempts, benchmarks and actual TUI/provider captures.
- `persistence-audit/`: initial lifecycle audit and reproduction results.
- `tui-iteration/`: preceding iteration reports, dogfood-observations.md and tui-iteration-result.md.
- `previous-closeout/`: preceding scientific/MCP precision review and live observations.
- `archive-manifest.json`: original paths, archived filenames, hashes and credential redactions. `cleanup.json` records exact deleted roots. Original report contents retain historical temporary paths; deleted executable repro scripts are not available there.
- `qualification-0ba61280/`: historical receipt and checksum. The exact historical candidate tarball remains in the canonical qualification cache until the next qualification replaces it.

Cleanup removed 88,567,719 bytes from five explicitly owned temporary roots after checking processes and open file ownership. This included fake HTTP/MCP providers, copied credential homes, generated fleets/data, experimental source copies, demo workspaces and one abandoned full-suite test root. Reports and logs were retained as 674 files outside the checkout. Private credentials were excluded or redacted. The real operator configuration, saved sessions, ignored project data, supported regression fixtures, dependencies and local build were preserved. No repository tmp directory or untracked demo harness remained. The operator had already closed the demo TUI; do not recreate it merely to satisfy historical instructions. Other herdr tabs belong to unrelated projects.

## Proven validation and its limits

Before this documentation closeout:

- Complete root suite: 2750 pass, zero failures/cancellations, one Windows-only skip, 320.763 s. Same full file set with four concurrent test files.
- Final development CI: 849 root passes, one Windows-only skip, 24 web passes, 161.077 s.
- Scientific/MCP precision protections: 196 passes, including large integers, long decimals, 1e400 and negative zero.
- Principal closure: 70 passes and the retained retry-escape acceptance reproduction.
- Node 22.22.3: 207 earlier targeted passes and 50 final closure/prompt passes, not a complete Node 22 suite.
- Frozen installation: pass, 1.783 s. `pnpm run ci:release`: pass, 296.883 s. `pnpm run release:preflight`: pass, 7.630 s.
- Qualification included dependency/package audit and three installed-package/native timing tests with a real Chrome boot. Package: 1968 files, 10.43 MB packed, 51.94 MB unpacked, within documented budgets.

The last successful qualification authenticates only `0ba61280fc860ebcb158daf3b757969046d98e65`, Node v24.20.0, tarball SHA-256 `ea707feef63c29b6c6967abdc9faa28049a8ba790ab7bd92b7b1b82bc2dc04cb`. The canonical receipt is `/home/akougkas/.cache/clio-coder/qualification/f2c0deba876681e1/qualification.json`. This later documentation commit changes candidate identity. Do not report the new HEAD as qualified, edit the receipt, or reuse the old result as its qualification.

Live evidence includes one successful real OpenRouter read task and actual TUI failure, recovery, cancellation, resume, editor, Library, picker, worker and fleet journeys against a deterministic local provider. Mock-provider dogfooding is not live-model validation. The operator then tried the final local application. Existing nonfatal lint and web chunk-size warnings remain documented.

Earlier gate failures are retained: tmpfs exhaustion, overlong Unix/Chrome socket paths, a stale prompt-policy assertion repaired without relaxing the intended contract, and shutdown-fixture process disappearance/startup pressure. The final complete suite passed after the reviewed fixture repair and bounded concurrency. Do not hide these failures or rerun the full suite with unlimited concurrency on the same host without a reason.

## Remaining release steps

1. Inspect actual Git branch, HEAD, status, recent commits, worktrees and runtime ownership. Preserve any new operator work. Review the final diff and release notes against accepted fixes; check version/ACP/README/changelog consistency. Record remaining release/milestone chores using read-only remote inspection if needed. No merge, squash or history rewrite is required.
2. Use Node 24.20.0 and pinned pnpm 10.34.5 for the local candidate, and verify Chrome at `/usr/bin/google-chrome`. Use a short private disk-backed temporary root: `/tmp` is a small shared tmpfs, and long paths broke Unix sockets. Keep gate logs in the external evidence directory and outside the disposable test root.
3. Complete any tracked documentation/status or necessary repairs and commit them. Run relevant development tests before qualification if code changes. The complete root suite has already passed; another exhaustive run is optional unless new changes justify it. If needed, use the exact complete file set below with bounded concurrency.
4. With clean committed source, run frozen installation once, then `pnpm run ci:release`. It includes routine CI; no separate redundant routine gate is required immediately beforehand. Save the exact command, exit status, full log, source SHA, Node version, receipt and artifact digest. New qualification removes the old canonical receipt before starting; a failed run does not leave a valid candidate.
5. After success, run only the allowed `pnpm run release:preflight` and read-only checks. Do not rebuild, repack, run the full suite or edit tracked source/docs afterward. Record final results outside the checkout to keep candidate identity stable. Clean only the temporary root you created after all owned subprocesses settle.
6. Present the exact candidate, digest, gates, remaining limitations and release notes. Stop at the remote authorization boundary. After explicit authorization, follow docs/process/release-cut-checklist.md for remote ancestry checks, main fast-forward, required hosted checks, annotated version tag, the dependent GitHub release workflow and npm publication using the unchanged qualified artifact. Qualification expires after 24 hours. Check version availability before publishing; never force an existing release tag.
7. After authorized publication, verify npm availability/install, reconcile milestone issues and retire the local branch only when the work is proven on canonical main. None of those remote mutations are already authorized by this handoff.

Recommended local environment, keeping this shell open for the gate commands:

```bash
cd /home/akougkas/iowarp/clio-coder
git status --short --branch
node --version
pnpm --version
release_tmp=$(mktemp -d /var/tmp/c49.XXXXXXXX)
export TMPDIR="$release_tmp"
pnpm install --frozen-lockfile
pnpm run ci:release
# Only after successful qualification:
pnpm run release:preflight
```

Optional complete root investigation, only before qualification:

```bash
node --import tsx --import ./tests/harness/tmp-root.ts --test --test-concurrency=4 tests/contracts/*.test.ts tests/extended/*.test.ts tests/smoke/*.test.ts tests/extended-smoke/*.test.ts
```

## Limitation fixes after the ec331b19 qualification, 2026-09-17

Claude Code qualified `ec331b1937d44bc3c462bf277bbccfcd5f4d8127` (tarball SHA-256 `ea707feef63c29b6c6967abdc9faa28049a8ba790ab7bd92b7b1b82bc2dc04cb`), then the operator redirected work to the known limitations before release. These commits supersede that candidate and require new qualification. The changelog is redated 2026-09-17 to match the cut, following the 0.4.7 and 0.4.8 precedent. Evidence is under `qualification-ec331b19/` and `fixes-b0db77a1/` in the external archive.

| Commit | Repair |
| --- | --- |
| 6b05097a | Version-3 resume reopens and restamps in one atomic metadata publication. The regression test fails on the old source with two publications. |
| 0085d8cb | Lint reports zero warnings and zero infos. The web entry chunk drops from 582 kB to 234 kB; the warning limit covers only Mermaid's 662 kB upstream lazy chunk. |
| 6494cef5 | OpenAI-compatible routes restore the error body pi-ai truncates at 4000 characters, only on an exact prefix and length match, bounded at 65536 characters. Route advice stays visible for long diagnostics. |
| b0db77a1 | The boot tool-support warning no longer fires for never-probed targets. |

The complete root suite then passed on Node 22.22.3 at `b0db77a1`: 2754 tests, 2753 pass, zero failures or cancellations, one Windows-only skip, 349.5 s, four concurrent files. This replaces the earlier targeted-only Node 22 coverage.

Qwopus is resolved by measurement: the gateway `/v1/model/info` row for `mini/qwopus3.8-27b-dense-q6` publishes `supports_function_calling: true`, and two real headless turns on that route called `context` and `read` and returned the exact file lines. The earlier warning came from Clio resolving capabilities before any probe. No persistent route or capability override was made.

## Known remaining issues

1. The error-body restoration covers the OpenAI-compatible engine path only. The openai-responses, Azure, Codex, Mistral, Google and Bedrock adapters keep the upstream 4000-character cap; Google and Bedrock reject a custom fetch.
2. Windows/macOS, actual SSH/hosted fleets, physical power loss/network filesystems and a broad provider matrix remain untested. An SSH fleet check needs a Clio install on a homelab node and a persistent `fleet.nodes` entry, which requires operator approval. Mandatory discovery overhead remains a binding evaluated policy.

No newly introduced unresolved blocker was identified in the accepted slices. Keep these limitations visible, and follow new evidence if qualification identifies a release blocker.
