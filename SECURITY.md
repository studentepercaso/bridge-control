# Security policy

Bridge Control is a desktop-only permission and diagnostics companion. It does not expose an HTTP server, note-content API, arbitrary command runner, updater, or telemetry channel.

## Supported versions

| Version | Status |
| --- | --- |
| 0.3.x | Supported public preview |
| Earlier versions | Not supported |

## Report a vulnerability

Use **Security → Report a vulnerability** in this GitHub repository. Do not open a public issue for permission bypasses, unsafe external-file access, arbitrary executable invocation, vault identity confusion, symlink/junction problems, or configuration corruption.

Use synthetic vault names and paths. Never include real note content, personal paths, settings files, audit records, tokens, or credentials.

## Security boundaries

- The plugin reads folder metadata through the Obsidian Vault API only to build the picker.
- Note bodies are not read or written by Bridge Control.
- Hidden folders and unsafe relative paths are rejected.
- Shared settings are schema-validated, size-bounded, written atomically, and protected by an ownership lock.
- Vault permissions are bound to the stable vault ID and canonical local root.
- Diagnostics run only after an explicit click, exclude the ambient `PATH`, use known install paths or an explicit environment override, execute only `version` through `execFile` without a shell, and require recognized Obsidian version output.
- The global Obsidian vault registry is opened without following a final symlink and is size-checked before reading.
- Network access, self-updating, analytics, advertisements, and dynamic code loading are absent.

The external Obsidian Bridge runtime is a separate component with its own [security policy](https://github.com/studentepercaso/obsidian-bridge/blob/main/SECURITY.md).
