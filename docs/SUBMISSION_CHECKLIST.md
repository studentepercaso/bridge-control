# Obsidian Community submission checklist

- [ ] `README.md`, `LICENSE`, and `manifest.json` are in the repository root.
- [ ] Manifest ID and name are unique and valid.
- [ ] Manifest, package, versions file, and release tag use the same version.
- [ ] Version 0.5.3 is paired with the matching Obsidian Bridge 0.5.3 release and exact UTF-8 regression tests cover create/append prepare, CAS, backup, chunk/final verification, recovery classification, no-final-newline, LF, CRLF, BOM, Unicode, and real concurrent changes.
- [ ] `npm ci && npm run check` passes.
- [ ] The release contains `main.js`, `manifest.json`, and `styles.css` as individual assets.
- [ ] Bilingual `docs/RELEASE_NOTES_0.5.3.md` matches the shipped bridge and companion behavior without claiming an unperformed live-vault test or atomic rollback.
- [ ] External shared-file access, CLI diagnostics, and the exact settings-backed read-only snapshots used by the external bridge for create/append and management transaction state are disclosed.
- [ ] The resulting append document stays at or below 1 MiB, create requires an existing parent, and environment-only writing fails closed before mutation.
- [ ] Post-mutation create/append failures preserve exact backup/audit evidence, never attempt destructive CLI restore, and expose only the bounded manual-recovery diagnostics.
- [ ] The `bridge-control:commit` protocol, version-4 settings schema, granular permissions, and management mutation code remain unchanged; the read-only audit diagnostics accept only the two new bounded manual-recovery codes and no direct note-write path was added.
- [ ] No telemetry, updater, advertisements, dynamic code, or real vault data is included.
- [ ] Repository and release are public.
- [ ] Submit the repository URL at https://community.obsidian.md under **Plugins → New plugin**.
