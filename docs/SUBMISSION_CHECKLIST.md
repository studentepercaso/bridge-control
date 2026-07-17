# Obsidian Community submission checklist

- [ ] `README.md`, `LICENSE`, and `manifest.json` are in the repository root.
- [ ] Manifest ID and name are unique and valid.
- [ ] Manifest, package, versions file, and release tag use the same version.
- [ ] Version 0.5.6 is paired with the matching Obsidian Bridge 0.5.6 release and exact UTF-8 regression tests cover create/append prepare, CAS, backup, chunk/final verification, recovery classification, no-final-newline, LF, CRLF, BOM, Unicode, and real concurrent changes.
- [ ] `npm ci && npm run check` passes.
- [ ] The release workflow performs a clean locked check, two byte-identical production builds, GitHub build-provenance attestation for `main.js`, `manifest.json`, and `styles.css`, and uploads those exact files to a draft release; historical backfill is dispatched only from `main` and its custom predicate fields are verified explicitly.
- [ ] Bilingual `docs/RELEASE_NOTES_0.5.6.md` matches the shipped bridge and companion behavior without claiming an unperformed live-vault test, atomic rollback, or an unexecuted attestation backfill.
- [ ] External shared-file access, non-executing CLI candidate diagnostics, and the exact settings-backed read-only snapshots used by the external bridge for create/append and management transaction state are disclosed.
- [ ] One create/append proposal stays at or below 64 KiB UTF-8, the exact resulting note stays at or below 1 MiB, every Unicode-safe CLI frame stays at or below 3072 UTF-8 bytes, create requires an existing parent, and environment-only writing fails closed before mutation.
- [ ] Post-mutation create/append failures preserve exact backup/audit evidence, never attempt destructive CLI restore, and expose only the bounded manual-recovery diagnostics.
- [ ] `child_process` and every executable launch are absent from the companion; definitive CLI readiness is checked by the external bridge.
- [ ] Node filesystem access is limited to documented external settings/lock/quarantine, read-only registry, one-time request, backup, and audit stores, never note paths; note reads and writes use public Obsidian APIs.
- [ ] The folder picker uses `Vault.configDir`; equivalent control-character validation and the promise/type/throw/CSS lint fixes introduce no new permission or write surface.
- [ ] Shared settings migrate fail-closed to version 5 with the real `Vault.configDir`; legacy entries are deny-all until migrated, intersecting grants are removed, and the external bridge denies that directory case-insensitively in every mode.
- [ ] The `bridge-control:commit` protocol, granular permissions, and management mutation code remain unchanged; no direct note-write path was added.
- [ ] No telemetry, updater, advertisements, dynamic code, or real vault data is included.
- [ ] Repository and release are public.
- [ ] Submit the repository URL at https://community.obsidian.md under **Plugins → New plugin**.
