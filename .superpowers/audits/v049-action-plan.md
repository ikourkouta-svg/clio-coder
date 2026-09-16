# clio-coder-action-plan — v0.4.9

Operator-authored release mandate, recorded verbatim on 2026-09-16 so a fresh session can read it without the chat transcript.

Scientific tool quality and a unified capability gateway

### Release mandate

This is a tool-engineering release, not a namespace cleanup.

Audit and improve every tool's implementation, scientific suitability, resource consumption, failure behavior, and evidence. Moving an existing implementation behind the gateway does not qualify as completing its audit.

1. The base agent remains distinctly Clio

### Recommended directly exposed tools

| Purpose | Tools |
| --- | --- |
| Fundamental coding operations | read, write, edit, bash, grep, find, ls |
| Context and repository understanding | context, code_nav |
| Executable verification | verify |
| Observable scientific processing | A first-class script runner, working name run_script |
| Additional capabilities | gateway |

Why these additions: context retrieves workspace state and historical observations; code_nav provides indexed structural understanding; verify grounds claims in executable checks. These are central Clio functions, not optional accessories.

run_script is my proposed addition, not an already-approved implementation detail. It earns its place only by providing a materially better execution contract than another Bash wrapper.

Keep this surface harness-owned and non-overridable. Safety and worker policies may still restrict execution.

Simplify context itself: retain workspace understanding and recall directly; move library browsing, marketplace administration, and other secondary operations out of its permanent schema. Preserve skill activation through the appropriate admitted capability.

2. Make scientific script execution a first-class operation

DO NOW

The scientific workflow should be:

Inspect data → execute an inspectable transformation → retain outputs and provenance → verify the result → return a bounded explanation.

The script runner should provide:

- Explicit interpreter, script, arguments, and working directory.
- Recorded script identity, execution settings, and declared input/output references.
- Live, bounded progress; separate stdout and stderr.
- Cancellation, timeout, process cleanup, and honest terminal outcomes.
- Large outputs written to artifacts rather than pushed into model context.
- Explicit handling of partial outputs after failure.
- No automatic dependency installation, hidden environment changes, or automatic retries of side effects.

Reuse the existing execution substrate. Do not create another process-management stack.

Clio already has useful execution and output-shaping machinery. But the current Bash implementation retains captured output in memory and terminates execution when its 16 MiB hard output cap is exceeded. That is not the same contract as safely streaming a large scientific result to disk.

Important: declared paths describe intended inputs and outputs; they do not enforce filesystem isolation. Keep the distinction between permission checks and sandboxing explicit.

3. Audit file tools for real scientific workloads

DO NOW, release-critical

The source exposes concrete reasons to go beyond prompt cleanup:

- read.ts reads the entire file synchronously before selecting lines, including for tail requests, and rejects files above 20 MB.
- Non-image content is decoded as UTF-8 without establishing that it is valid text.
- write.ts and edit.ts perform whole-file writes; their in-process mutation queue does not by itself establish crash safety or protection against external writers.
- Search has native and fallback implementations whose coverage and limits need explicit reconciliation.

These are engineering targets, not a claim that every existing behavior is defective.

### Required outcomes

Reading
- Bounded-memory access to large text files.
- Efficient tailing and honest pagination.
- Explicit encoding, binary, partial-read, and file-change behavior.
- No presenting a sampled or truncated view as the complete dataset.

Writing and editing
- Clearly defined overwrite and concurrent-change behavior.
- No partial publication on failed structured transformations where atomic publication is supported.
- Preserve promised encoding, line endings, permissions, and relevant metadata.
- Explicit behavior for symlinks, shared filesystems, and external modifications.

Searching
- Distinguish "no matches" from "search incomplete."
- Report skipped files, exhausted limits, cancellation, and unsupported inputs.
- Avoid expensive full-tree or whole-file work when requesting a small result.

Benefit: Clio remains useful when the repository contains enormous logs, generated sources, numerical outputs, and evolving datasets, not only small UTF-8 source files.

4. Support structured data without pretending every file is text

DO NOW, with bounded format commitments

Recommendation:

- Make CSV/TSV and JSON/JSONL the initial explicitly supported structured-data cases.
- Handle scientific binary formats, such as HDF5, NetCDF, and Parquet, through approved, versioned libraries invoked by the script runner or configured adapters.
- Do not hand-write approximate parsers or silently install dependencies.
- Do not feed binary data through text replacement.
- Do not silently rewrite structured files merely to inspect them.

For each supported format, specify:
- Inspection and selection behavior.
- Schema, dimensions, types, and available metadata.
- Missing-value and numeric-precision handling.
- Whether the view is exact, sampled, or converted.
- Validation required before publishing modified output.

Critical scientific constraint: preserve large integers, units, ordering, and missing-value semantics where the format contract requires them. Successful parsing is not sufficient evidence of a correct transformation.

5. Strengthen verification rather than merely keeping the tool

DO NOW

Clio already implements numerical comparison and performance-budget checks. Audit their mathematical contracts and reporting, not just whether the commands run.

Require explicit treatment of:
- Absolute, relative, and ULP tolerances.
- Zero references, non-finite values, shape mismatches, and missing results.
- Whether multiple tolerance conditions combine with AND or OR.
- Baseline identity and provenance.
- Environment differences affecting performance comparisons.
- The difference between execution success, validation success, and scientific validity.

For example, the current numerical comparator requires every configured tolerance to hold. That may be intentional, but it must not be mistaken for the common combined absolute/relative tolerance formula.

Benefit: "verified" has a precise, inspectable meaning, not a reassuring label.

6. Implement the approved gateway decisions

DO NOW

Preserve the choices you made:

- One stable find / describe / call gateway.
- Secondary Clio capabilities discovered on demand.
- artifact retained behind the gateway, including an explicit terminal-document contract.
- Web reading separated from authenticated actions and research workflows.
- Local stdio MCP only for this release.
- Existing command-based user extensions behind the same gateway.
- One canonical admission, cancellation, accounting, result-shaping, and evidence path.

Gateway calls must retain the identity and semantics of the underlying capability. They must not become opaque "gateway succeeded" records that break verification, skill activation, or mutation observers.

Local MCP servers and extension commands require explicit trust. Launching them through a gateway does not sandbox them.

7. Require an individual audit disposition for every tool

DO NOW, mandatory team deliverable

Every existing tool, plus the gateway and proposed script runner, gets its own record:

1. Purpose: what necessary operation does it uniquely provide?
2. Placement: direct, gateway, internal-only, or retire.
3. Contract: inputs, outputs, side effects, and failure semantics.
4. Implementation: correctness, cancellation, concurrency, and resource bounds.
5. Scientific integrity: precision, completeness, provenance, and validation.
6. Disposition: retain, repair, redesign, merge, or remove, with source evidence.

No blanket "all tools reviewed" sign-off. No automatic assumption that built-ins are trustworthy because Clio authored them.

8. Define "impeccable" as release requirements

No comparative benchmark campaign is needed for this work. Deterministic correctness, stress, cancellation, and integration tests are required.

Release requirements:

- Bounded output does not conceal unbounded internal allocation.
- Expensive operations do not block terminal responsiveness.
- Partial searches and sampled data are explicitly identified.
- Failed writes do not masquerade as successful artifacts.
- Cancellation leaves an honest outcome and performs supported cleanup.
- Numerical checks have boundary-case fixtures.
- Structured transformations preserve their declared semantics.
- Direct and gateway invocation preserve the same authority and evidence.
- Missing dependencies and unsupported formats produce actionable refusals, not fabricated interpretation.

We cannot honestly guarantee "Clio succeeds wherever every other agent fails." We can require that Clio handles specified difficult scientific cases correctly and never disguises uncertainty, truncation, or unsupported behavior.

Ranked release scope

| Priority | Decision |
| --- | --- |
| P0, do now | Audit every tool; repair foundational I/O and execution contracts. |
| P0, do now | Keep context, navigation, and verification directly available. |
| P0, do now | Establish scientific script processing and explicit data-integrity requirements. |
| P1, do now | Gateway, prompt simplification, web separation, gateway-only artifacts. |
| P1, do now | Local MCP and existing user tools under unified policy. |
| Already covered | Reuse working-set management, offloading, receipts, and evidence ownership. |
| Defer | Script-to-tool calling, general OS sandboxing, remote MCP/OAuth, durable-run redesign, hosted infrastructure. |

The release should make Clio's tools better, not merely make fewer of them visible.
