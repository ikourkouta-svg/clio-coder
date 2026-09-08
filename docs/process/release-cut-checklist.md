# Release-Cut Checklist

> **Visual blueprint:** The source checkout includes the complete
> [Release-Cut Checklist visual reference](https://github.com/iowarp/clio-coder/blob/main/docs/html/release_checklist_blueprint.html).

This document provides the standard procedure for cutting a release of Clio Coder.
Releases are cut from an annotated tag on canonical main. The GitHub release is
produced by GitHub Actions, while package publication to npm is an authorized manual
step performed by a maintainer. Everything before the authorization boundary is local,
repeatable, and reversible. Every step following the authorization boundary affects
canonical remote state or publishes immutable packages.

## Part 1: Candidate Preparation on a Local Compact Branch

Maintainers prepare release candidates on a local-only compact branch named after
the version without punctuation, such as `v046` for version `0.4.6`. Dotted branch
names like `v0.4.6` are forbidden because dotted names belong exclusively to immutable
tags. The canonical repository hosts only `main`, and no release candidate branch is
ever pushed to canonical origin.

1. Ensure the working tree is clean and updated from canonical origin:

   ```bash
   git checkout -b v046 origin/main
   ```

2. Update `version` in `package.json` and `assets/acp-registry/agent.json` to the
   release version. Update the README's source-install tag and remove any
   development-only notices. Keep historical release records, protocol schema
   versions, dependency versions, and migration fixtures unchanged.

3. Retitle the active changelog section in `CHANGELOG.md` from `## Unreleased` to
   `## <version> - YYYY-MM-DD`. The release gate in `scripts/check-release.mjs` requires
   the first version header to match the version in `package.json`.

4. Commit the release candidate preparation locally:

   ```bash
   git commit -am "chore(release): prepare <version>"
   ```

## Part 2: Local Candidate Verification Gate

Run deterministic local checks on the candidate commit before requesting authorization.

1. Execute the release gate:

   ```bash
   pnpm run ci:release
   ```

   This gate runs `pnpm run ci` followed by `node scripts/check-release.mjs`. It verifies
   type checking, Biome formatting, hygiene rules, architecture boundary invariants,
   the build, the contract and smoke test suites, trace-viewer tests, and dist integrity.
   The packaging audit checks executable entry shebangs, ensures forbidden files like
   source maps and caches are omitted, verifies runtime resources from `scripts/release-manifest.json`,
   and enforces size limits (10 MB packed, 50 MB unpacked).

2. Optionally validate a live model turn against a configured target:

   ```bash
   node dist/cli/index.js run --target <id> --autonomy read-only "Reply with exactly: CLIO_LIVE_OK"
   ```

3. Run the real-home smoke test against the operator configuration:

   ```bash
   pnpm run smoke:real-home --target <id> --strict
   ```

   This runs `scripts/smoke-real-home.sh` using a copy of operator settings in a scratch
   `CLIO_CODER_HOME`. The `--strict` flag ensures any failing rows from `clio-coder doctor`
   fail the smoke run.

4. Inspect the npm package contents with a dry run:

   ```bash
   npm pack --dry-run
   ```

5. Validate an installed tarball in a clean temporary directory:

   Create a temporary directory, pack the tarball, install it via npm, and verify
   installed binary lifecycle commands in an isolated environment with an empty `CLIO_CODER_HOME`:

   ```bash
   clio-coder --version
   clio-coder --help
   clio-coder doctor
   clio-coder uninstall --dry-run
   ```

## Part 3: Candidate Review and Authorization Boundary

Before touching any remote ref, summarize the candidate for maintainer review:
- Candidate commit SHA
- Results of `pnpm run ci:release`
- Verification output from real-home smoke and installed package testing
- Changelog contents and target npm version

Every step below changes canonical remote refs, creates a release, or publishes
an immutable package. Do not execute any of them without explicit maintainer authorization.

## Part 4: Fast-forward Canonical Main

1. Fetch the latest remote status from origin:

   ```bash
   git fetch origin
   ```

2. Confirm `origin/main` is an ancestor of the local candidate branch.

3. Fast-forward local `main` to the candidate commit:

   ```bash
   git checkout main
   git merge --ff-only v046
   ```

4. Verify that local `main` matches the reviewed candidate SHA exactly.

5. Push `main` to canonical origin:

   ```bash
   git push origin refs/heads/main:refs/heads/main
   ```

   No release branch is ever pushed to origin.

## Part 5: Tagging and GitHub Release

1. Wait for GitHub Actions CI on canonical `main` to finish green for the pushed SHA.

2. Create an annotated git tag matching the version:

   ```bash
   git tag -a v<version> -m "Clio Coder <version>"
   ```

3. Push only the release tag to canonical origin:

   ```bash
   git push origin refs/tags/v<version>
   ```

4. Pushing the tag triggers `.github/workflows/release.yml`. The workflow:
   - Verifies the tag matches `package.json`.
   - Runs `pnpm run ci:release` on the tagged commit.
   - Packs the release tarball with `npm pack`.
   - Extracts the version changelog section from `CHANGELOG.md`.
   - Creates the GitHub Release with the tarball attached using `gh release create`.

5. Inspect the GitHub Actions workflow run and confirm the GitHub release is published.

6. Reconcile the release milestone against the tagged commits and each ticket's
   acceptance evidence. `Fixes #123` or `Resolves #123` in a commit closes that
   ticket when the commit reaches default-branch `main`; a bare `#123`, changelog
   mention, tag, or GitHub release does not. Verify the resulting issue state.
   Explicitly close completed tickets missed by automatic closure and retain
   their implementing commit and validation references. Carry incomplete work
   forward with its remaining criteria, then close the reconciled milestone.
   Never infer completion from a release-note mention alone.

## Part 6: Package Publication to npm

Publishing to npm is a manual maintainer step performed from the tagged commit.

1. Confirm authentication and registry status:

   ```bash
   npm whoami
   ```

2. Confirm the version does not already exist on npm:

   ```bash
   npm view @iowarp/clio-coder@<version>
   ```

3. Publish the package from the tagged checkout:

   ```bash
   npm publish
   ```

   The `prepublishOnly` lifecycle script sets `CLIO_CODER_RELEASE_CONTEXT=publish` and
   re-executes `pnpm run ci:release` as a mandatory release-mode verification gate before
   files are uploaded. When publishing a pre-release channel, append `--tag <channel>`.

## Part 7: Post-Publish Verification and Branch Closeout

1. Verify package availability on npm:

   ```bash
   npm view @iowarp/clio-coder version
   ```

2. On a clean machine, install the package globally and run basic lifecycle checks:

   ```bash
   npm install -g @iowarp/clio-coder@<version>
   clio-coder --version
   clio-coder doctor
   ```

3. Remove the local compact candidate branch:

   ```bash
   git branch -d v046
   ```

   The canonical repository remains in its steady state containing only `main` and immutable tags.

## Part 8: Rollback and Error Recovery

npm package publication is irreversible. A published version cannot be removed or overwritten.
Any issue discovered after publication must be resolved through a subsequent release. Prior
to pushing git tags or publishing to npm, local candidate commits can be amended or reset freely.
