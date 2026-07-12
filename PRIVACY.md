# Privacy

Effective date: 2026-07-12

Bridge Control is local, open-source configuration software. It has no hosted service, account system, advertising, analytics, or project-operated telemetry.

## Data it accesses

Bridge Control accesses:

- the current vault's stable Obsidian ID, display name, and absolute local path;
- Obsidian's global `obsidian.json` registry outside the vault, read only and size-bounded, to verify that stable ID and local path;
- the list of folder paths in the current vault, solely to populate the visual picker;
- the read/write permission settings selected by the user;
- a bounded tail of metadata-only write audit records for the current stable vault ID;
- the plugin's own Obsidian data;
- the shared settings file used by the external Obsidian Bridge runtime.

It does not read or write note bodies while configuring access or diagnosing recent problems. It may check whether an audited note path currently exists and open that note only after the user selects **Open note**.

During an authenticated managed operation, Bridge Control reads the exact affected note through Obsidian's Vault API for compare-and-swap verification, backup, mutation, and postcondition checks. The matching 0.5.4 external bridge uses a settings-backed bounded exact UTF-8 read-only snapshot for every create/append and management transactional observation, including preparation, CAS, backup capture, chunk/final verification, and recovery classification. Create/append mutation still uses only the allowlisted official CLI. This changes no data category, network flow, permission, command-protocol field, or direct note-write surface.

After a post-mutation create/append failure, the external bridge does not perform a destructive automatic CLI restore. It preserves exact backup and metadata-only audit evidence, leaves the observed note untouched, and can report `manual_recovery_required=true`. Bridge Control 0.5.4 recognizes the matching bounded diagnostic codes in Recent problems; it does not read or display the backup body.

## Local filesystem access outside the vault

Bridge Control uses Node filesystem APIs only for these documented external stores: shared settings and their ownership lock or revocation-quarantine copy; the read-only global Obsidian registry; authenticated one-time management requests; recovery backups; and metadata-only audit records. It never uses Node filesystem APIs to read or write a note path. Note content is read and mutated only through public Obsidian APIs.

The plugin updates one local shared settings file:

- Windows: `%LOCALAPPDATA%\ObsidianBridge\settings.json`
- macOS: `~/Library/Application Support/ObsidianBridge/settings.json`
- Linux: `$XDG_CONFIG_HOME/ObsidianBridge/settings.json` or `~/.config/ObsidianBridge/settings.json`

The file contains vault identity, absolute path, actual `Vault.configDir`, the `protected`, `full` (Autonomous), or `management` access mode, authorized relative folders, and exact edit/move/trash grants. Strict version-2 through version-4 entries migrate to version 5 without inventing management authority. A legacy vault stays deny-all until its own Obsidian instance records the real configuration directory. It does not contain note bodies, prompts, model responses, or API keys.

The plugin's normal Obsidian data caches the selected access mode, enabled state, read mode, relative read/write folder lists, granular management choices, and up to 100 acknowledged audit change IDs. This cache keeps the panel usable, but it is never authoritative for enabling Autonomous access or Full management: if the shared entry is missing, the cache is forced back to Protected access. It does not store audit note bodies or backup content.

If a revocation cannot be verified after a safe retry, Bridge Control may rename the shared settings file to a timestamped `.revoked-…json` quarantine copy in the same directory so autonomous access fails closed. That copy contains the same sensitive vault identity and permission metadata and should be removed after recovery.

An administrator can explicitly override this location with `OBSIDIAN_BRIDGE_SETTINGS_PATH` in Obsidian's process environment. Vault plugin data cannot change the destination.

## CLI candidate diagnostics

Diagnostics run only after an explicit user click. They derive a candidate from an explicit environment override or known Obsidian installation/CLI registration paths, not the ambient `PATH`. Bridge Control does not spawn, execute, or query the candidate. It displays the non-authoritative result locally; the external bridge performs the definitive readiness check when it attempts an allowlisted CLI-backed operation.

## Recent problems

Recent problems reads at most the final 128 KiB of the external bridge's `audit.ndjson`, returns at most 20 validated records for the current stable vault ID, rejects symlinks and non-regular files, and ignores malformed lines. Audit records may contain note paths, hashes, operation, authorization channel, error code, recovery outcome, backup ID, timestamp, change ID, and optional bounded `failure_stage` and `cause_code` values, including the safe manual-recovery categories. They never contain raw exception messages, CLI stdout/stderr, note text, proposed content, or backup bodies. Diagnostic metadata is not permission, confirmation, or authority to retry.

Without an override, Bridge Control and Obsidian Bridge use the same deterministic platform local-data directory. If `OBSIDIAN_BRIDGE_DATA_DIR` is customized for Codex, Obsidian must inherit the same absolute variable for this panel to display that audit file; the bridge's MCP log tool still reads the writer's configured location directly.

## Network activity

Bridge Control makes no network requests. Installing or updating Obsidian, downloading the plugin, Obsidian Sync, the external bridge, and an AI/MCP host have separate data flows and privacy terms.

## Removing data

Returning to protected access immediately revokes autonomous writing while retaining the earlier folder choices. Disabling the vault revokes all bridge access but retains its local identity and folder metadata. Uninstalling the plugin also does not erase the shared entry or the external bridge's audit/backups. To erase that metadata, stop the external bridge and remove the vault entry, audit/backups, and local plugin data according to your retention needs.

For the Italian version, see [PRIVACY.it.md](PRIVACY.it.md).
