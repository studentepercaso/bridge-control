# Security policy

Bridge Control is a desktop-only permission and diagnostics companion. It does not expose an HTTP server, note-content API, arbitrary command runner, updater, or telemetry channel.

## Supported versions

| Version | Status |
| --- | --- |
| 0.5.x | Supported public preview |
| 0.4.x | Supported public preview |
| 0.3.x | Not supported |
| Earlier versions | Not supported |

## Report a vulnerability

Use **Security → Report a vulnerability** in this GitHub repository. Do not open a public issue for permission bypasses, unsafe external-file access, arbitrary executable invocation, vault identity confusion, symlink/junction problems, or configuration corruption.

Use synthetic vault names and paths. Never include real note content, personal paths, settings files, audit records, tokens, or credentials.

## Security boundaries

- The plugin reads folder metadata through the Obsidian Vault API to build the picker. The fixed management handler reads or mutates only the exact Markdown note named by an authenticated, expiring, single-use request.
- Bridge Control exposes no general note-content API. Replacement, frontmatter, move, and trash use bounded public Obsidian APIs only after the matching current granular grant is rechecked.
- Hidden folders and unsafe relative paths are rejected.
- Shared settings are schema-validated, size-bounded, written and verified under one ownership lock. Failed privilege increases restore the prior policy; failed revocations reassert the narrower target or quarantine the file, never restore full access. Abandoned settings locks are not stolen automatically.
- Strict version-2 and version-3 settings migrate to version 4 without management grants. Autonomous access and Full management require separate explicit warning acknowledgements naming the current vault; Full management also records an exact non-empty edit/move/trash permission snapshot. Every privilege transition is checked against the latest shared state while the lock is held.
- Vault permissions are bound to the stable vault ID and canonical local root.
- Diagnostics run only after an explicit click, exclude the ambient `PATH`, use known install paths or an explicit environment override, execute only `version` through `execFile` without a shell, and require recognized Obsidian version output.
- The global Obsidian vault registry is opened without following a final symlink and is size-checked before reading.
- Recent problems reads only a bounded audit tail, filters by stable vault ID, rejects symlinks and non-regular files, and never opens backup or note bodies. Optional `failure_stage` and `cause_code` diagnostics are bounded metadata only; raw exception messages, CLI output, note text, proposed content, and backup bodies are rejected. Diagnostic data cannot grant permission or authorize retry.
- The public CLI surface is limited to `bridge-control:commit` with an exact request ID and high-entropy token. There is no shell, `eval`, arbitrary command, command-palette, plugin-management, or permanent-delete surface.
- Network access, self-updating, analytics, advertisements, and dynamic code loading are absent.

The external Obsidian Bridge runtime is a separate component with its own [security policy](https://github.com/studentepercaso/obsidian-bridge/blob/main/SECURITY.md).

Access profiles change only the exact authorization saved for the current vault. The matching 0.5.1 bridge must continue to enforce hidden-path denial, physical containment, source hashes, backups, audit, commit locks, postcondition verification, and separate create/append and management tool surfaces. Older bridge versions fail closed on settings schemas they do not understand.
