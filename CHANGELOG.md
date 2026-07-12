# Changelog

## 0.5.4 - 2026-07-12

- Remove `child_process` and every executable launch from Bridge Control; CLI diagnostics now report only a non-authoritative candidate and leave the definitive readiness check to the external bridge.
- Use the vault's actual `Vault.configDir` in folder selection, replace control-character regular expressions with equivalent character-code validation, and resolve the reported promise, type, thrown-value, unused-code, and CSS `:has()` findings.
- Migrate shared settings to version 5 so the real `Vault.configDir` is an authoritative, case-insensitive external-bridge deny rule. Legacy entries remain deny-all until their own vault records it, and intersecting saved folder grants are removed without inventing new authority.
- Retain Node filesystem access only for documented external settings/lock/quarantine, read-only registry, one-time request, recovery-backup, and metadata-only audit stores; note reads and mutations remain exclusively on public Obsidian APIs.
- Add a GitHub Actions release workflow that performs locked checks, requires two byte-identical builds, attests `main.js`, `manifest.json`, and `styles.css`, and creates a draft release from those exact assets. Its manual backfill path refuses to attest unless existing release assets match a clean tagged rebuild byte for byte.
- Add no permission, command-protocol field, management operation, direct filesystem note-write, or other write surface.

## 0.5.3 - 2026-07-12

- Publish metadata and documentation matching Obsidian Bridge 0.5.3, and update the read-only audit diagnostics parser/UI to accept and classify the two bounded manual-recovery codes.
- Document that settings-backed create/append transactions now use bounded exact UTF-8 observations throughout preparation, conflict checks, backup capture, verification, and recovery classification, while mutations remain restricted to the allowlisted official Obsidian CLI.
- Document fail-closed migration for the legacy environment-only writer, the 1 MiB resulting-document boundary for append, the existing-parent requirement for create, and explicit manual-recovery diagnostics after a post-mutation create/append failure.
- Keep Bridge Control's settings schema, command protocol, public Obsidian API mutation code, permission model, audit format, and management behavior unchanged; diagnostics remain bounded and read-only.

## 0.5.2 - 2026-07-12

- Align with Obsidian Bridge 0.5.2 exact UTF-8 management snapshots so notes without a final newline no longer produce false `CHANGE_CONFLICT` results.
- Preserve the in-Obsidian compare-and-swap check: real source changes between prepare and commit continue to fail closed before mutation.
- Keep the `bridge-control:commit` request protocol, version-4 settings schema, granular edit/move/trash grants, backups, audit fields, and public Obsidian API mutation surface unchanged.
- Add no direct note-write path, permission, command, or remote service.

## 0.5.1 - 2026-07-12

- Accept and display the bridge's bounded `failure_stage` and `cause_code` metadata for recent failed create and append operations.
- Keep the diagnostic record content-free: raw exception messages, CLI stdout/stderr, note text, proposed content, and backup bodies are never stored or shown.
- Preserve strict audit validation, current-vault filtering, rollback classification, and the independent retention of recent failures.
- Clarify that diagnostics explain an observed failure but never grant permission or authorize an automatic retry.

## 0.5.0 - 2026-07-12

- Add an explicitly confirmed **Full management** profile alongside Protected and Autonomous access.
- Split elevated mutation authority into independent per-vault permissions for note/frontmatter editing, rename/move, and move to Obsidian trash.
- Register the narrow public Obsidian CLI handler `bridge-control:commit` for authenticated, expiring, single-use requests prepared by Obsidian Bridge.
- Execute mutations through public Obsidian APIs: atomic `Vault.process` (including YAML frontmatter helpers), isolated `Vault.rename`, and `FileManager.trashFile`.
- Create a recovery backup before each managed mutation, verify postconditions, append metadata-only audit outcomes, and attempt bounded recovery after a partial failure.
- Reject stale hashes, expired or replayed requests, mismatched vault IDs, unsafe paths, destination collisions, and permissions revoked before commit.
- Deliberately omit permanent deletion, JavaScript evaluation, shell access, arbitrary Obsidian commands, plugin management, and unrestricted filesystem operations.
- Migrate strict version-2 and version-3 settings to version 4 without inventing management grants. Version-3 Full access remains Autonomous access; invalid or unverifiable policies fail closed.
- Keep elevated activation user-only: local plugin data cannot restore Autonomous or Full-management access, and every permission increase is saved and read back under the shared settings lock.
- Extend Recent problems to classify managed `replace`, `frontmatter`, `move`, and `trash` outcomes without exposing note or backup bodies.

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
