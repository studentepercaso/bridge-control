# Security policy

Bridge Control is a desktop-only permission and diagnostics companion. It does not expose an HTTP server, note-content API, arbitrary command runner, child-process launcher, updater, or telemetry channel.

## Supported versions

| Version          | Status                   |
| ---------------- | ------------------------ |
| 0.5.x            | Supported public preview |
| 0.4.x            | Supported public preview |
| 0.3.x            | Not supported            |
| Earlier versions | Not supported            |

## Report a vulnerability

Use **Security → Report a vulnerability** in this GitHub repository. Do not open a public issue for permission bypasses, unsafe external-file access, arbitrary executable invocation, vault identity confusion, symlink/junction problems, or configuration corruption.

Use synthetic vault names and paths. Never include real note content, personal paths, settings files, audit records, tokens, or credentials.

## Security boundaries

- The plugin reads folder metadata through the Obsidian Vault API to build the picker. The fixed management handler reads or mutates only the exact Markdown note named by an authenticated, expiring, single-use request.
- Bridge Control exposes no general note-content API. Replacement, frontmatter, move, and trash use bounded public Obsidian APIs only after the matching current granular grant is rechecked. The matching 0.5.5 bridge uses settings-backed exact UTF-8 observations throughout create/append and management transactions; Bridge Control still compares the exact in-Obsidian managed source before mutation, so real concurrent changes fail closed.
- The matching 0.5.5 bridge accepts at most 64 KiB of UTF-8 content in one create/append proposal, increased from 8 KiB. The exact resulting note remains bounded to 1 MiB, and every Unicode-safe Obsidian CLI frame remains bounded to 3072 UTF-8 bytes.
- Hidden folders, the vault's actual `Vault.configDir`, and unsafe relative paths are rejected. The picker does not assume the configuration folder is named `.obsidian`; every case variant of the authoritative directory is denied even when Linux hosts the vault on a case-insensitive volume.
- Shared settings are schema-validated, size-bounded, written and verified under one ownership lock. Failed privilege increases restore the prior policy; failed revocations reassert the narrower target or quarantine the file, never restore full access. Abandoned settings locks are not stolen automatically.
- Strict version-2 through version-4 settings migrate to version 5 without inventing management grants. Legacy entries are deny-all until their exact vault records the real `Vault.configDir`; intersecting folder grants are removed, and the external bridge adds that directory to every read/write deny policy, including whole-vault modes. Autonomous access and Full management require separate explicit warning acknowledgements naming the current vault; Full management also records an exact non-empty edit/move/trash permission snapshot. Every privilege transition is checked against the latest shared state while the lock is held.
- Vault permissions are bound to the stable vault ID and canonical local root.
- Diagnostics run only after an explicit click, exclude the ambient `PATH`, and derive a candidate only from known install paths or an explicit environment override. The companion contains no `child_process` import and executes no candidate; the external bridge performs the authoritative CLI readiness check when needed.
- The global Obsidian vault registry is opened without following a final symlink and is size-checked before reading.
- Recent problems reads only a bounded audit tail, filters by stable vault ID, rejects symlinks and non-regular files, and never opens backup or note bodies. Optional `failure_stage` and `cause_code` diagnostics are bounded metadata only; 0.5.5 recognizes the safe manual-recovery codes without accepting raw exception messages, CLI output, note text, proposed content, or backup bodies. Diagnostic data cannot grant permission or authorize retry.
- Node filesystem access is allowlisted to shared settings and lock/quarantine state, the read-only Obsidian registry, one-time requests, recovery backups, and metadata-only audit. It is never used for note paths; note access remains on public Obsidian APIs.
- The public CLI surface is limited to `bridge-control:commit` with an exact request ID and high-entropy token. Version 0.5.5 adds no companion protocol field, permission, or command. There is no shell, `eval`, arbitrary command, command-palette, plugin-management, direct filesystem note-write, or permanent-delete surface.
- Network access, self-updating, analytics, advertisements, and dynamic code loading are absent.

The external Obsidian Bridge runtime is a separate component with its own [security policy](https://github.com/studentepercaso/obsidian-bridge/blob/main/SECURITY.md).

Access profiles change only the exact authorization saved for the current vault. The matching 0.5.5 bridge must continue to enforce hidden-path denial, physical containment, exact UTF-8 transactional observations and hashes, backups, audit, commit locks, postcondition verification, and separate create/append and management tool surfaces. Create/append filesystem observations remain read-only and their mutations remain on the allowlisted official CLI. The larger 64 KiB proposal limit does not raise the 1 MiB resulting-note boundary or the 3072-byte CLI-frame boundary. After a post-mutation failure, create/append preserves evidence and requires manual recovery rather than attempting a non-atomic destructive CLI restore. Older bridge versions fail closed on settings schemas they do not understand.
