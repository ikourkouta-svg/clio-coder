# Clio Coder Scientific Validation Contracts

> **Visual blueprint:** The source checkout includes the complete
> [Clio Coder Scientific Validation Contracts visual reference](https://github.com/iowarp/clio-coder/blob/main/docs/html/validation_blueprint.html).

Scientific software development cannot treat simple file presence as proof of correctness. A simulation script that crashes on rank 48, or writes out NetCDF arrays filled with `NaN`s, may still successfully write a file to the disk. 

Clio Coder recognizes a **scientific validation contract** as an opt-in signal for a higher evidence bar. One strict loader in `src/domains/safety/validation-contract.ts` reads the first of `.clio-coder/validation.yaml`, `.clio-coder/validation.yml`, `validation.yaml`, or `validation.yml` at the workspace root and parses it under the version-1 schema below. A contract that parses raises the default rigor level to `high`. A contract that does not parse (empty, malformed YAML, unknown field, unsupported version, over the 256 KiB cap) leaves rigor at `normal` and is diagnosed with the exact fault: `clio-coder doctor` reports it in the `validation contract` row, the interactive session prints it once at startup, and `clio-coder verifiers author` repeats it. A Markdown `VALIDATION.md` is recognised as present but is never parsed and never raises rigor on its own; it is advisory prose for developers, project agents, and external validators.

This advisory convention is separate from the executable project verifier catalog at `.clio-coder/verifiers.yaml`. The verifier catalog has a strict version-1 schema and admits exact argv vectors to the `verify` tool. Scientific validation contracts and handbook expectations do not grant command authority: prose such as `validators: ["python tools/check_grid.py"]` remains guidance until the project owner confirms the equivalent argv, cwd, timeout, and tags in `verifiers.yaml`. The executable catalog does not interpret numerical tolerances or artifact expectations; it only runs the explicitly declared process vector through safe-exec.

`clio-coder verifiers author` reads the parsed contract's `validators` entries through the same loader and proposes catalog checks. It labels those vectors as project-declared and shows their source index, exact argv, cwd, timeout, tags, catalog path, and resulting execution authority. This inspection is read-only. A command string with sound quoting and no shell operator can be represented as argv for review; shell expansion, pipes, redirection, environment assignments, incomplete quoting, and Markdown prose receive a manual JSON-argv diagnostic. Nothing becomes executable and nothing is dry-run until the operator confirms the catalog write with `--yes`.

The convention below is a recommended shape for scientific projects that need to document expected dimensions, attributes, numerical tolerances, scheduler context, and verification commands for scientific artifacts. Developed at the [Gnosis Research Center (GRC)](https://grc.iit.edu) at Illinois Tech as part of the NSF-funded scientific-software context (NSF Award [#2411318](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2411318)), this convention links execution metadata with physical output checks without claiming that the current harness executes those checks automatically.

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

> [!NOTE]
> Clio core does not currently execute tolerance comparisons and does not apply a default numerical tolerance. Put defaults directly in project validators or contract text.

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
