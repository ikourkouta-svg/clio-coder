# Clio Coder Scientific Validation Contracts

Scientific software development cannot treat simple file presence as proof of correctness. A simulation script that crashes on rank 48, or writes out NetCDF arrays filled with `NaN`s, may still successfully write a file to the disk. 

Clio Coder recognizes a **scientific validation contract** as an opt-in signal for a higher evidence bar. One strict loader in `src/domains/safety/validation-contract.ts` reads the first of `.clio-coder/validation.yaml`, `.clio-coder/validation.yml`, `validation.yaml`, or `validation.yml` at the workspace root and parses it under the version-1 schema below. A contract that parses raises the default rigor level to `high`. A contract that does not parse (empty, malformed YAML, unknown field, unsupported version, over the 256 KiB cap) leaves rigor at `normal` and is diagnosed with the exact fault: `clio-coder doctor` reports it in the `validation contract` row, the interactive session prints it once at startup, and `clio-coder verifiers author` repeats it. A Markdown `VALIDATION.md` is recognized as present but is never parsed and never raises rigor on its own; it is advisory prose for developers, project agents, and external validators.

This advisory convention is separate from the executable project verifier catalog at `.clio-coder/verifiers.yaml`. The verifier catalog has a strict schema (version 2, with version 1 still loading) and admits exact argv vectors to the `verify` tool. Scientific validation contracts and handbook expectations do not grant command authority: prose such as `validators: ["python tools/check_grid.py"]` remains guidance until the project owner confirms the equivalent argv, cwd, timeout, and tags in `verifiers.yaml`. The executable catalog runs only the explicitly declared process vector through safe-exec; a `numeric-compare` or `perf-budget` entry adds a judgement of that command's output or wall time, never an interpretation of the contract's artifact expectations.

`clio-coder verifiers author` reads the parsed contract's `validators` entries through the same loader and proposes catalog checks. It labels those vectors as project-declared and shows their source index, exact argv, cwd, timeout, tags, catalog path, and resulting execution authority. This inspection is read-only. A command string with sound quoting and no shell operator can be represented as argv for review; shell expansion, pipes, redirection, environment assignments, incomplete quoting, and Markdown prose receive a manual JSON-argv diagnostic. Nothing becomes executable and nothing is dry-run until the operator confirms the catalog write with `--yes`.

The convention below is a recommended shape for scientific projects that need to document expected dimensions, attributes, numerical tolerances, scheduler context, and verification commands for scientific artifacts. Developed at the [Gnosis Research Center (GRC)](https://grc.iit.edu) at Illinois Tech as part of the NSF-funded scientific-software context (NSF Award [#2411318](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2411318)), this convention links execution metadata with physical output checks; the harness executes a check only through a matching `verifiers.yaml` entry.

---

## Validation Contract Convention

A validation contract is a YAML file under the version-1 schema; `VALIDATION.md` is the Markdown companion for prose that the schema cannot hold. A custom or project-level agent (such as a local `scientific-validator` agent example under `.clio-coder/agents/`) or the developer can draft these files and commit them next to the research code. The loader rejects unknown fields at every level and names the field it rejected, so a typo is a diagnostic rather than a silently ignored key.

### Example netCDF / Slurm validation contract:
```yaml
version: 1
task: "Regenerate the regional climate output and confirm grid metadata."
runtime:
  kind: slurm
  nodes: 4
  ranks: 64
  walltime: "01:30:00"
  modules:
    - "intel/2024"
    - "openmpi/5.0"
    - "netcdf-c/4.9"
artifacts:
  - path: out/region_west.nc
    format: NetCDF
    expected_dimensions:
      time: 8760
      lat: 360
      lon: 720
    expected_attributes:
      Conventions: "CF-1.10"
    numerical_tolerances:
      relative: 1.0e-6
    preserve: false
  - path: ckpt/run-0042.chk
    format: Checkpoint files
    preserve: true
validators:
  - "ncdump -h out/region_west.nc"
  - "python tools/check_grid.py out/region_west.nc"
notes: |
  The run is submitted with sbatch; queue exit status is not a completion check.
  Re-run check_grid.py after job completion is observed.
```

The `validators` values above are intentionally advisory shell-like prose. Preview the exact catalog proposal with `clio-coder verifiers author`, or declare the Python validator manually without granting free-form shell interpretation:

```yaml
# .clio-coder/verifiers.yaml
version: 1
checks:
  - id: validate-grid
    description: Validate the generated regional grid
    command: [python, tools/check_grid.py, out/region_west.nc]
    cwd: .
    timeoutMs: 120000
    tags: [scientific, netcdf]
```

### Schema (version 1):
Every field except `version` is optional. Strings are capped at 4096 bytes (`notes` at 16 KiB), `artifacts` at 256 entries, `validators` at 128, `runtime.modules` at 64, and each map at 256 keys; a diagnostic cites the cap it crossed.
1. **`version`:** Required, exactly `1`.
2. **`task`:** One string describing the work the contract covers.
3. **`runtime`:** `kind` is required and one of `local`, `slurm`, `mpi`, or `other`; `nodes` and `ranks` are positive integers, `walltime` is a string, and `modules` is a list of strings.
4. **`artifacts`:** Each entry needs `path`; `format` is a string, `expected_dimensions` maps names to non-negative integers, `expected_attributes` maps names to strings, `numerical_tolerances` holds `relative`, `absolute` (finite non-negative numbers), and `ulp` (non-negative integer), and `preserve` is a boolean. `preserve` is a project convention for cleanup workflows; Clio's built-in protected-artifact guard is separate and is driven by live `protect_path` effects, not by this field.
5. **`validators`:** A list of command strings a verifier should satisfy. They remain prose until the project declares matching `verifiers.yaml` entries.
6. **`notes`:** Free text.

---

## Numerical Tolerances

Comparing floating-point values in scientific computations must accommodate round-offs, hardware differences, and compiler optimizations. Project validators can document any tolerance vocabulary they enforce. A common convention is:

| Tolerance Type | Formula / Check | Purpose |
| :--- | :--- | :--- |
| **`relative`** | $\frac{|val - ref|}{|ref|} \le relative$ | Fractional difference check. Crucial for scaling datasets. |
| **`absolute`** | $|val - ref| \le absolute$ | Additive difference check. Used when reference value is close to `0`. |
| **`ulp`** | $StepsBetween(val, ref) \le ulp$ | Unit in the Last Place. Measures floating-point representation steps. |

Tolerances become executable through a `kind: numeric-compare` entry in `.clio-coder/verifiers.yaml` (catalog version 2). The entry's `command` prints a JSON object of `string -> number | number[]` on stdout, `reference` names a repository-relative JSON file of the same shape, and `tolerance` names at least one of `relative`, `absolute`, or `ulp`. A value passes only when it satisfies every tolerance given; a key missing on either side fails with the key named, arrays compare elementwise and fail on length mismatch, and any `NaN` or infinity fails. The report lists each key's worst deviation and which tolerance it failed, and it is recorded on the `verify` result and on the host-verification check of a dispatch receipt. Clio applies no default tolerance: the catalog entry states it. `clio-coder verifiers author` proposes one such entry for every contract artifact that declares `numerical_tolerances`, with the command left for the operator to fill, so nothing runs until the operator confirms an exact argv. A `kind: perf-budget` entry judges the command's wall time the same way against a `budget` or a recorded baseline; see [Tool usage](../guide/tool-usage.md#project-verifier-catalog).

---

## Common Scientific Artifact Families

The following labels are useful project conventions for validation contracts and reports. They are not a closed, core-enforced enum in the current source tree:

- **`HDF5` / `NetCDF` / `Zarr`:** Multi-dimensional scientific array files.
- **`FITS`:** Flexible Image Transport System (used in astrophysics).
- **`CSV` / `Parquet`:** Structured tabular data and datasets.
- **`VTK and ParaView`:** Visualizations and mesh outputs.
- **`Slurm job output`:** Standard logs emitted by Slurm queue managers.
- **`MPI rank-sensitive tests`:** Diagnostic outputs matching multi-rank jobs.
- **`Checkpoint files` / `Simulation restart artifacts`:** Stateful binary dumps.
- **`Plots and generated figures`:** Output graphics (verified via path + checksum metadata).

## HPC Schedulers and Validation Lifecycle

Scheduler-driven runs require distinct validation handling compared to local unit tests:
- **Queue status is not validation**: Checking if a Slurm command like `sbatch` exits successfully only proves that the Slurm scheduler accepted the job script. A good contract tells the verifier how to check actual simulation artifacts inside `out/` or `ckpt/` after job completion.
- **Environment module loading**: The `runtime.modules` array can document the exact software stack dependencies (such as `intel/2024`, `openmpi/5.0`) that must be loaded before running the validators.
- **HPC and Data Integration**: For large-scale allocations such as those at the Argonne Leadership Computing Facility (ALCF), projects can archive verification logs through their own storage or data-transfer workflow. Clio core does not manage Globus transfers.
- **Validator execution**: A parsed contract's `artifacts` and `validators` are requirements the `verifier` agent and custom project-level agents must satisfy, and they are executable only through `verifiers.yaml` entries. Automated in-harness execution of the contract itself is not implemented.

### How a Validation Contract Raises Session Rigor

Clio Coder integrates scientific validation contracts directly into its safety model to raise the evidence standard automatically:
- **Parsed contract escalates**: At startup and at every finish-gate decision, `rigorResolution()` in `src/domains/safety/rigor.ts` loads the contract. A contract that parses raises the session's rigor level from `normal` to `high` with source `validation-contract`. An unparseable contract yields `normal` with source `invalid-contract` and the fault as the diagnostic; a Markdown-only workspace yields `normal` with source `markdown-advisory`. `CLIO_CODER_RIGOR` still overrides both directions.
- **High-Rigor Gate Requirements**: Once the rigor is `high`, the finish gate is active. It engages on a settled `turn_end` only when the recent window contains successful workspace mutation evidence and no validation evidence or `limitation` receipt. The window is entries since the last user message, capped at 80 entries:
  - Clio issues a `request_continuation` middleware effect to keep the session running.
  - Clio injects a dynamic warning reminder (`HIGH_RIGOR_REVALIDATION_MESSAGE`) instructing the agent to run a verification command or to call `limitation` before it can conclude the turn.

## Verification boundaries and limitation receipts

File readback establishes artifact inspection, not executed scientific validation. When an agent or worker modifies files but cannot execute the outstanding checks with its admitted tools and approved scope:

1. **The generic `limitation` tool**:
   - Clio provides the pure canonical `limitation` tool (`src/tools/limitation.ts`), recording a `limitation` tool_call and tool_result receipt in the session ledger.
   - Arguments:
     - `scope` (required string): What could not be verified, in one sentence.
     - `reason` (required enum): One of `no-runner`, `blocked`, `out-of-scope`, `environment`, or `other`.
     - `paths` (optional array of strings): Repository-relative file paths left unverified.
   - A prose disclaimer or text summary in conversation is not a limitation receipt; only a successful `limitation` tool call registers a typed receipt in the session ledger.

2. **Recipe instructions vs generic harness**:
   - Bundled scientific recipes (such as Materio research agents in `library/plugins/materio`) explicitly instruct workers via `<clio_verification_boundary>` in their recipe bodies to call `limitation` when external checks cannot run. This boundary instruction is authored recipe content, not an unconditional harness envelope injected into every worker.

3. **Finish gate enforcement**:
   - At high rigor (such as when a valid `validation.yaml` contract is present), the finish gate monitors workspace mutations within the recent active turn window (up to 80 entries since the last user message).
   - If mutating tool calls occurred in that window without executed validation evidence or a `limitation` receipt, `finishContractRegistration` (`src/domains/safety/finish-contract-registration.ts`) emits a `request_continuation` middleware effect accompanied by a reminder (`HIGH_RIGOR_REVALIDATION_MESSAGE`). At normal rigor, it emits an advisory reminder without blocking.
   - The gate checks structural evidence presence; it does not grade the empirical correctness of scientific code. Runtime turn budgets, deadline limits, operator cancellation, and tool failures still apply.
   - A limitation receipt never converts missing or failing checks into a pass; it formally records the limitation so callers and operators know the scientific result is incomplete.
   - Verified by contracts `tests/extended/materio-plugin.test.ts` and `tests/extended/safety-policy-remediation.test.ts`.

