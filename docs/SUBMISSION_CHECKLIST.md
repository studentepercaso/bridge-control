# Obsidian Community submission checklist

- [ ] `README.md`, `LICENSE`, and `manifest.json` are in the repository root.
- [ ] Manifest ID and name are unique and valid.
- [ ] Manifest, package, versions file, and release tag use the same version.
- [ ] Version 0.5.2 is paired with the matching Obsidian Bridge 0.5.2 release and exact UTF-8 snapshot regression tests cover no-final-newline, LF, CRLF, BOM, and real concurrent changes.
- [ ] `npm ci && npm run check` passes.
- [ ] The release contains `main.js`, `manifest.json`, and `styles.css` as individual assets.
- [ ] Bilingual `docs/RELEASE_NOTES_0.5.2.md` matches the shipped bridge and companion behavior.
- [ ] External shared-file access, CLI diagnostics, and the exact managed-source snapshot used by the external bridge for conflict detection are disclosed.
- [ ] The `bridge-control:commit` protocol, version-4 settings schema, and granular permissions remain unchanged; no direct note-write path was added.
- [ ] No telemetry, updater, advertisements, dynamic code, or real vault data is included.
- [ ] Repository and release are public.
- [ ] Submit the repository URL at https://community.obsidian.md under **Plugins → New plugin**.
