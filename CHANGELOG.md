# Changelog

## 0.4.1 - 2026-07-12

- Fix the settings-panel rerender crash shown immediately after Full access was successfully enabled.
- Pass each CSS class as an individual DOM token and add a regression test that rejects multi-token `addClass` calls.
- Distinguish a real activation failure from a post-save panel refresh failure so a verified permission is never reported as rejected.
- Keep the verified Full-access policy unchanged during the update.

## 0.4.0 - 2026-07-12

- Add a prominent **Accesso completo** profile with one explicit per-vault acknowledgement and immediate return to protected access.
- Preserve existing protected read/write folder choices while full access is active.
- Migrate strict version-2 shared settings to version 3 as protected access only.
- Add **Problemi recenti**, a bounded audit-tail view with recovery classification, current note existence, open-note action, and persistent acknowledgement of reviewed errors.
- Keep failed events visible independently from later successful writes, and flag unreadable or partially malformed audit data instead of showing a green status.
- Treat per-vault plugin data only as a protected-mode draft: full access can be activated solely from a verified shared policy or the explicit warning dialog.
- Check every protected-to-full transition against the latest shared state under the settings lock. Failed increases restore the previous policy; failed revocations reassert the narrower target or quarantine the shared file instead of restoring full access.
- Serialize local plugin-data updates and use the same deterministic default audit directory as Obsidian Bridge.
- Continue to read no note or backup bodies from the settings companion.
- Require the matching Obsidian Bridge 0.4.0 autonomous writer for full-access execution; older bridge versions fail closed on version-3 settings.

## 0.3.4 - 2026-07-12

- Publish the companion version aligned with Obsidian Bridge 0.3.4.
- Keep the existing visual folder permissions and deny-by-default behavior unchanged.
- Point users to the matching bridge update, which prevents the Obsidian 1.12.7 Windows CLI IPC crash during long note writes.

## 0.3.3 - 2026-07-11

- Publish Bridge Control as a standalone desktop-only Obsidian community plugin.
- Ignore external settings paths stored in vault plugin data; only deterministic OS paths or an explicit environment override are accepted.
- Run CLI diagnostics only after an explicit click, stop searching the ambient PATH, and require recognized Obsidian version output.
- Bound and safely open the global Obsidian vault registry before reading it.
- Add a searchable visual folder picker with separate read and write selection.
- Keep new vaults deny-by-default and writing disabled until explicitly configured.
- Bind permissions to Obsidian's stable vault ID and canonical local path.
- Atomically update the shared version-2 settings file while preserving other vaults.
- Add official CLI diagnostics limited to the allowlisted `version` command.
- Add bilingual documentation, privacy disclosures, security policy, tests, and release validation.
