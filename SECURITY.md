# Security policy

Bridge Control is a desktop-only permission and diagnostics companion. It does not expose an HTTP server, note-content API, arbitrary command runner, updater, or telemetry channel.

## Supported versions

| Version | Status |
| --- | --- |
| 0.4.x | Supported public preview |
| 0.3.x | Supported public preview |
| Earlier versions | Not supported |

## Report a vulnerability

Use **Security → Report a vulnerability** in this GitHub repository. Do not open a public issue for permission bypasses, unsafe external-file access, arbitrary executable invocation, vault identity confusion, symlink/junction problems, or configuration corruption.

Use synthetic vault names and paths. Never include real note content, personal paths, settings files, audit records, tokens, or credentials.

## Security boundaries

- The plugin reads folder metadata through the Obsidian Vault API only to build the picker.
- Note bodies are not read or written by Bridge Control.
- Hidden folders and unsafe relative paths are rejected.
- Shared settings are schema-validated, size-bounded, written and verified under one ownership lock. Failed privilege increases restore the prior policy; failed revocations reassert the narrower target or quarantine the file, never restore full access. Abandoned settings locks are not stolen automatically.
- Strict version-2 settings migrate to version 3 only as protected access; full access requires one explicit warning acknowledgement naming the current vault. The protected-to-full transition is checked against the latest shared state while the lock is held, so a stale panel cannot undo an external revocation.
- Vault permissions are bound to the stable vault ID and canonical local root.
- Diagnostics run only after an explicit click, exclude the ambient `PATH`, use known install paths or an explicit environment override, execute only `version` through `execFile` without a shell, and require recognized Obsidian version output.
- The global Obsidian vault registry is opened without following a final symlink and is size-checked before reading.
- Recent problems reads only a bounded audit tail, filters by stable vault ID, rejects symlinks and non-regular files, and never opens backup or note bodies.
- Network access, self-updating, analytics, advertisements, and dynamic code loading are absent.

The external Obsidian Bridge runtime is a separate component with its own [security policy](https://github.com/studentepercaso/obsidian-bridge/blob/main/SECURITY.md).

Full access changes only the external runtime authorization. Bridge Control does not itself write note content, and the matching bridge must continue to enforce hidden-path denial, physical containment, source hashes, backups, audit, commit locks, chunk verification, and the limited create/append tool surface. Older bridge versions fail closed on version-3 settings.
