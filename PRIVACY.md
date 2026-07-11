# Privacy

Effective date: 2026-07-11

Bridge Control is local, open-source configuration software. It has no hosted service, account system, advertising, analytics, or project-operated telemetry.

## Data it accesses

Bridge Control accesses:

- the current vault's stable Obsidian ID, display name, and absolute local path;
- Obsidian's global `obsidian.json` registry outside the vault, read only and size-bounded, to verify that stable ID and local path;
- the list of folder paths in the current vault, solely to populate the visual picker;
- the read/write permission settings selected by the user;
- the plugin's own Obsidian data;
- the shared settings file used by the external Obsidian Bridge runtime.

It does not read or write note bodies while configuring access.

## Local storage outside the vault

The plugin updates one local shared settings file:

- Windows: `%LOCALAPPDATA%\ObsidianBridge\settings.json`
- macOS: `~/Library/Application Support/ObsidianBridge/settings.json`
- Linux: `$XDG_CONFIG_HOME/ObsidianBridge/settings.json` or `~/.config/ObsidianBridge/settings.json`

The file contains vault identity, absolute path, access mode, and authorized relative folders. It does not contain note bodies, prompts, model responses, or API keys.

An administrator can explicitly override this location with `OBSIDIAN_BRIDGE_SETTINGS_PATH` in Obsidian's process environment. Vault plugin data cannot change the destination.

## CLI diagnostics

Diagnostics run only after an explicit user click. They inspect an explicit environment override or known Obsidian installation/CLI registration paths, not the ambient `PATH`. A candidate is executed with only `version`, without a shell, and accepted only if its output matches a recognized Obsidian version format. The result is displayed locally.

## Network activity

Bridge Control makes no network requests. Installing or updating Obsidian, downloading the plugin, Obsidian Sync, the external bridge, and an AI/MCP host have separate data flows and privacy terms.

## Removing data

Disabling the vault in Bridge Control immediately revokes bridge access but retains its local identity and folder metadata. Uninstalling the plugin also does not erase the shared entry. To erase that metadata, stop the external bridge and remove the vault entry from the shared settings file.

For the Italian version, see [PRIVACY.it.md](PRIVACY.it.md).
