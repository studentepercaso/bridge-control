# Attested release workflow

Starting with version 0.5.4, release assets are built and attested by
`.github/workflows/release.yml`. The workflow can also verify and add
attestations to an existing release without modifying its assets.

## Prepare a release

1. Update `package.json`, `package-lock.json`, `manifest.json`, and
   `versions.json` to the same `x.y.z` version.
2. Run `npm ci` and `npm run check`, then commit the release source and
   metadata. `main.js` remains an ignored build output and is produced by the
   release workflow from the tagged source.
3. Merge the release commit into `main`.
4. Create and push an exact `x.y.z` tag on that commit.

The workflow rejects a tag that does not match the package and manifest
versions, is missing the matching `versions.json` entry, or does not point to
a commit contained in `main`. It installs the lockfile dependencies, runs the
complete check and runs the production build twice, requiring both generated
`main.js` files to be byte-for-byte identical.

For a tag push, the workflow creates SLSA build-provenance attestations for
`main.js`, `manifest.json`, and `styles.css`, then uploads those exact files to
a draft GitHub release. Review and edit the generated release notes before
publishing the draft. Do not replace the assets manually: replacement files
have different digests and will not match the attestations.

The draft step is safe to rerun. It resumes an existing draft for the tag,
accepts only the three expected asset names, uploads the same attested outputs
with `--clobber`, and downloads them again to verify both the final asset set
and every byte. It refuses to modify a published release or a draft containing
any extra asset.

## Backfill an existing release

Run the **Build and attest release** workflow manually from GitHub Actions and
enter an existing exact version tag, such as `0.5.3`. Select the `main` branch
as the workflow ref; the workflow rejects every other dispatch ref. The
equivalent CLI command is:

```sh
gh workflow run release.yml \
  --repo studentepercaso/bridge-control \
  --ref main \
  -f tag=0.5.3
```

The manual path checks out that tag, performs the same clean locked build,
first checks the complete asset list returned by the GitHub Releases API, and
only then downloads the three existing assets. It requires the release to be
published, the asset set to be exact, and every downloaded file to match the
rebuild byte for byte. It does not create, edit, replace, or republish the
existing release. A mismatch fails closed.

Historical assets were not produced by the backfill run, so this path does not
claim SLSA build provenance. Instead, it creates a custom historical-release
verification attestation. Its signed predicate records the exact release tag,
the verified source commit, release identity, expected asset set, and the
successful clean-rebuild byte comparison. New releases use the tag-push path
and therefore receive normal SLSA provenance during the original tagged build.

### Historical release verification predicate v1

The custom predicate type is:

```text
https://github.com/studentepercaso/bridge-control/attestations/historical-release-verification/v1
```

The predicate uses `schemaVersion: 1` and the verification type
`historical-release-rebuild`. Its assertions mean that the tag resolved to the
recorded `sourceCommit`, that commit was contained in `main`, and the published
assets matched a byte-identical repeated clean build. This is a verification
statement about an already-published release, not a statement that the manual
workflow originally built those historical files.

## Verify downloaded assets

With GitHub CLI installed and authenticated, verify assets from a new tag-push
release against this repository's SLSA provenance, exact signer workflow, and
tag source ref:

```sh
TAG=0.5.4
for ASSET in main.js manifest.json styles.css; do
  gh attestation verify "$ASSET" \
    --repo studentepercaso/bridge-control \
    --signer-workflow studentepercaso/bridge-control/.github/workflows/release.yml \
    --source-ref "refs/tags/$TAG"
done
```

For a historical backfill, select the custom predicate type and bind the
certificate to the release workflow running from `main`. Then validate the
user-controlled predicate fields against GitHub's release and commit records:

```sh
TAG=0.5.3
PREDICATE_TYPE="https://github.com/studentepercaso/bridge-control/attestations/historical-release-verification/v1"
RELEASE_ID="$(gh api "repos/studentepercaso/bridge-control/releases/tags/$TAG" --jq .id)"
SOURCE_COMMIT="$(gh api "repos/studentepercaso/bridge-control/commits/$TAG" --jq .sha)"

for ASSET in main.js manifest.json styles.css; do
  gh attestation verify "$ASSET" \
    --repo studentepercaso/bridge-control \
    --predicate-type "$PREDICATE_TYPE" \
    --signer-workflow studentepercaso/bridge-control/.github/workflows/release.yml \
    --source-ref refs/heads/main \
    --format json > "$ASSET.attestation.json"

  jq -e \
    --arg tag "$TAG" \
    --arg commit "$SOURCE_COMMIT" \
    --argjson release_id "$RELEASE_ID" \
    'any(.[].verificationResult.statement.predicate;
      .schemaVersion == 1 and
      .verificationType == "historical-release-rebuild" and
      .releaseTag == $tag and
      .sourceCommit == $commit and
      .releaseId == $release_id and
      .releaseState == "published" and
      .assetSet == ["main.js", "manifest.json", "styles.css"] and
      .assertions.tagResolvesToSourceCommit == true and
      .assertions.sourceCommitContainedInMain == true and
      .assertions.repeatedBuildByteIdentical == true and
      .assertions.publishedAssetsMatchCleanRebuild == true)' \
    "$ASSET.attestation.json"
done
```
