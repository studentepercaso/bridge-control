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

## Local storage outside the vault

The plugin updates one local shared settings file:

- Windows: `%LOCALAPPDATA%\ObsidianBridge\settings.json`
- macOS: `~/Library/Application Support/ObsidianBridge/settings.json`
- Linux: `$XDG_CONFIG_HOME/ObsidianBridge/settings.json` or `~/.config/ObsidianBridge/settings.json`

The file contains vault identity, absolute path, protected/full access mode, and authorized relative folders. Strict version-2 entries migrate to version 3 as protected access only. It does not contain note bodies, prompts, model responses, or API keys.

The plugin's normal Obsidian data caches the selected access mode, enabled state, read mode, relative read/write folder lists, and up to 100 acknowledged audit change IDs. This cache keeps the panel usable, but it is never authoritative for enabling full access: if the shared entry is missing, the cache is forced back to protected mode. It does not store audit note bodies or backup content.

If a revocation cannot be verified after a safe retry, Bridge Control may rename the shared settings file to a timestamped `.revoked-…json` quarantine copy in the same directory so autonomous access fails closed. That copy contains the same sensitive vault identity and permission metadata and should be removed after recovery.

An administrator can explicitly override this location with `OBSIDIAN_BRIDGE_SETTINGS_PATH` in Obsidian's process environment. Vault plugin data cannot change the destination.

## CLI diagnostics

Diagnostics run only after an explicit user click. They inspect an explicit environment override or known Obsidian installation/CLI registration paths, not the ambient `PATH`. A candidate is executed with only `version`, without a shell, and accepted only if its output matches a recognized Obsidian version format. The result is displayed locally.

## Recent problems

Recent problems reads at most the final 128 KiB of the external bridge's `audit.ndjson`, returns at most 20 validated records for the current stable vault ID, rejects symlinks and non-regular files, and ignores malformed lines. Audit records may contain note paths, hashes, operation, authorization channel, error code, recovery outcome, backup ID, timestamp, change ID, and optional bounded `failure_stage` and `cause_code` values. They never contain raw exception messages, CLI stdout/stderr, note text, proposed content, or backup bodies. Diagnostic metadata is not permission, confirmation, or authority to retry.

Without an override, Bridge Control and Obsidian Bridge use the same deterministic platform local-data directory. If `OBSIDIAN_BRIDGE_DATA_DIR` is customized for Codex, Obsidian must inherit the same absolute variable for this panel to display that audit file; the bridge's MCP log tool still reads the writer's configured location directly.

## Network activity

Bridge Control makes no network requests. Installing or updating Obsidian, downloading the plugin, Obsidian Sync, the external bridge, and an AI/MCP host have separate data flows and privacy terms.

## Removing data

Returning to protected access immediately revokes autonomous writing while retaining the earlier folder choices. Disabling the vault revokes all bridge access but retains its local identity and folder metadata. Uninstalling the plugin also does not erase the shared entry or the external bridge's audit/backups. To erase that metadata, stop the external bridge and remove the vault entry, audit/backups, and local plugin data according to your retention needs.

For the Italian version, see [PRIVACY.it.md](PRIVACY.it.md).
