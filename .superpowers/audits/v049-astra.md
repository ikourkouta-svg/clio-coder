Completed the authorized cleanup on v049, with four logical commits and a clean working tree. All four requested gates passed. I’m paused
  at your design checkpoint for items 2 and 3; v048 also remains pending your choice. Nothing was pushed, tagged, or published.

  ## Completed changes

   Commit      Change
  ━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   b4e6d95a    refactor(cli): inject upgrade and boot runners instead of test hooks
  ──────────  ──────────────────────────────────────────────────────────────────────
   bfc888d8    fix(tui): implement tree cwd filtering and recent sorting
  ──────────  ──────────────────────────────────────────────────────────────────────
   bf7dc9d4    refactor(comments): describe current behavior without stale plans
  ──────────  ──────────────────────────────────────────────────────────────────────
   66a5862c    fix(models): correct Gemma channel-filter catalog notes

  ### 1. Upgrade and boot test hooks

  Removed every CLIO_CODER_TEST_ reference from shipped src/ code.

  - Upgrade now accepts dependencies for registry lookup, install-method detection, npm installation, post-install handoff, doctor-fix, and
    migrations, with real defaults.

  - runClioCommand() accepts a boot runner, replacing the Stage 1 delay and failure branches.
  - Lifecycle tests inject failures directly. The package-manager subprocess passes dependencies into its source-import script. The real-
    binary smoke test now exercises the normal source-checkout upgrade path without a no-network hook.

  - No tests were setting the former Stage 1 env variables.

  ### 4. /tree keys

  Implemented both keys and updated the overlay hints and command documentation:

  - p toggles filtering by the current cwd, with normalized path comparison.
  - s cycles tree order and most recent first, preserving the selected turn.
  - Both keys remain usable when filtering produces an empty list. In label-edit mode, they remain ordinary text input.
  - Sorting and filtering persist after label edits, and structural rows remain unswitchable.

  The current snapshot contains one session’s turn tree, so cwd filtering includes or excludes that entire snapshot.

  ### 5. Local-model follow-ups

  Both follow-up statements were stale. The shared Gemma channel filter already handles the named Gemma NVFP4 and Gemopus families and is
  wired into both OpenAI-compatible streaming entry points.

  I corrected the catalog notes and added fixtures using the actual bundled catalog entries. They verify split markers, empty thought
  regions, separate thinking and answer output, and final-message consistency through LM Studio and generic OpenAI-compatible targets.

  Live model inference was not run. The behavior of particular installed server versions and their current templates remains unverified.

  ## 7. Branch and stash hygiene

  Deleted these local branches:

  - v0.4.7, retaining the tag.
  - test/verification-diet
  - chore/pnpm-dev
  - refactor/pi-compaction-reuse
  - feat/workbench-read-parity
  - v045-r2-delivery-on-root

  The two non-ancestor branches were safe to remove after checking patch equivalence and the current code:

   Original commit    Equivalent commit in main    Verified behavior
  ━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   db2a4ad6           35fe7b03                     Workbench About record, run filters, and help reference
  ─────────────────  ───────────────────────────  ──────────────────────────────────────────────────────────────────────────────
   a198cee8           15ebe786                     Configurable mutation-report summary allowance
  ─────────────────  ───────────────────────────  ──────────────────────────────────────────────────────────────────────────────
   0efba1b0           aa3d3a0a                     Architect authorship bound and rejection of truncated reports before parsing

  For the stash, main already contains the execution-envelope schema, executionEnvelope, and buildEvalExecutionEnvelopeV1. Its
  implementation differs from the stashed draft; the draft’s rootReceipt fallback is absent.

  I preserved the complete stash commit 6583cec1 as archive/stash-eval-execution-envelope, including its untracked-file parent containing
  the schema, then dropped the stash.

  v048 remains. It equals main at c841a461.

  ## 6. Comment audit and unbuilt promises

  The broader case-insensitive scan covered 48 comment blocks across 51 matching source lines. The full classification and resolution report
  (/tmp/clio-v049-comment-audit.md) records each block.

  A material finding: the session budget ceiling does not block reservation allocation. The allocator records estimated cost without denying
  work. Dispatch separately enforces an explicit per-request intent cost ceiling. I corrected the budget comment and adjacent comments that
  incorrectly claimed session-ceiling enforcement.

  These unbuilt capabilities remain for your decision:

   Location            Promise and current state
  ━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   src/domains/mux/    Embedded pane hosting was promised “until Phase 5.” The comments now describe the actual refusal. Hosting remains
   detect.ts:11 and    unbuilt and is already tracked in ROADMAP.md.
   src/domains/mux/
   extension.ts:17
  ──────────────────  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   src/interactive/    Read-only providers were promised for all completion slots. Only agents, targets, models, skills, and tasks have
   slash-spec.ts:29    live catalogs; other slots default to empty. The comment now describes that partial wiring.
  ──────────────────  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   src/domains/        Exact provider token counts through /count_tokens or a tokenizer such as tiktoken remain deferred. That promise is
   session/            retained.
   compaction/
   tokens.ts:9

  I did not implement these capabilities.

  ## Actual verification results

  The requested chain completed successfully:

   Gate                  Result
  ━━━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   pnpm run typecheck    PASS, exit 0
  ────────────────────  ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   pnpm run lint         PASS, exit 0. Two warnings and two informational diagnostics in untouched files; all 16 hygiene checks passed.
  ────────────────────  ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   pnpm run build        PASS, exit 0. Vite reported a warning about chunks larger than 500 kB.
  ────────────────────  ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   pnpm run test         PASS, exit 0. 283 passed, 0 failed, 1 skipped out of 284 tests. The skipped test requires Windows process-tree
                         cancellation.

  Targeted tests also passed: 15 CLI/lifecycle tests, 5 tree-selector tests, and 12 Gemma channel-filter tests.

  Full gate log (/tmp/clio-v049-gates.log)

  ## Decisions needed before continuing

  ### 2. Self-edit gate

  Trusted dispatch origin, lineage, task-board provenance, and one-shot approvals exist. None establishes whether the operator requested a
  particular edit. Model-origin dispatches can perform operator-requested work, and operator-started turns can include unsolicited edits.

   Path                                                       Implication
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   (a) Implement the designed signal and gate                 Requires a new trusted intent contract; current metadata cannot honestly
                                                              supply the proposed meaning.
  ─────────────────────────────────────────────────────────  ───────────────────────────────────────────────────────────────────────────────
   (b) Gate agent-origin dispatches touching harness paths    Uses an existing signal, but also gates delegated operator work and does not
                                                              cover unsolicited main-agent edits.
  ─────────────────────────────────────────────────────────  ───────────────────────────────────────────────────────────────────────────────
   (c) Keep enforcement deferred — recommended                Move the design and re-entry conditions to ROADMAP.md, remove
                                                              SELF_EDIT_GATE.md, and update its documentation reference.

  ### 3. gateway

  No executable MCP client exists in src/. ACP rejects nonempty mcpServers; plugin discovery preserves MCP declarations without executing
  them. Command extensions provide an external capability surface through their existing extension_* tools.

  The two paths are:

  - Enforce the reserved name and track the design in ROADMAP.md — recommended. Registration would reject gateway; the current comment
    enforces nothing.

  - Implement a minimal gateway. This requires choosing and building a new external capability backend.

  Please choose item 2’s path, the gateway path, and whether to delete v048. I stopped these dependent changes because you explicitly
  required a decision before building at the design forks.