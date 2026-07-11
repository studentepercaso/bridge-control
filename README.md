# Bridge Control

[English](README.md) · [Italiano](README.it.md)

[![CI](https://github.com/studentepercaso/bridge-control/actions/workflows/ci.yml/badge.svg)](https://github.com/studentepercaso/bridge-control/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/studentepercaso/bridge-control)](https://github.com/studentepercaso/bridge-control/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Bridge Control is the desktop-only Obsidian companion for Obsidian Bridge. It lets users choose what the external bridge may read and which folders may receive proposed writes.

> [!IMPORTANT]
> Bridge Control configures permissions but does not itself expose notes to an AI. It works with the separate, local [Obsidian Bridge](https://github.com/studentepercaso/obsidian-bridge) runtime.

> [!WARNING]
> This is independent community software and is not affiliated with or endorsed by Obsidian or OpenAI. Start with a disposable vault or synthetic folder and keep an independent backup.

## Installation and use

1. During preview, copy the release assets manually. After directory approval, install and enable **Bridge Control** from Obsidian Community plugins.
2. Install [Obsidian Bridge](https://github.com/studentepercaso/obsidian-bridge/releases/latest) for the local Codex/MCP runtime.
3. If diagnostics request it, enable the official CLI under **Obsidian → Settings → General → Command line interface**.
4. Open **Settings → Community plugins → Bridge Control**.
5. Choose folders, enable **Read** and optionally **Write**, and save access.

The 0.3.3 settings interface is currently in Italian. This README provides the corresponding English workflow.

## Default behavior

On first run:

- access is scoped to the current vault identity;
- reading remains off until the user selects folders or the whole eligible vault;
- writing is off;
- no folder is preselected.

The panel includes a searchable visual picker, separate **Read** and **Write** checkboxes, recursive parent-folder coverage, explicit save and read-back verification, and diagnostics for the official Obsidian CLI.

## Shared settings

The companion atomically updates only the current vault entry in the version 2 shared settings file:

- Windows: `%LOCALAPPDATA%\ObsidianBridge\settings.json`
- macOS: `~/Library/Application Support/ObsidianBridge/settings.json`
- Linux: `$XDG_CONFIG_HOME/ObsidianBridge/settings.json` or `~/.config/ObsidianBridge/settings.json`

It stores the stable vault ID, normalized local path, access mode, and authorized relative folders. It does not store note bodies.

Administrators may explicitly redirect the shared settings file with the `OBSIDIAN_BRIDGE_SETTINGS_PATH` environment variable before starting Obsidian. Bridge Control never accepts that path from vault plugin data.

Paths must be relative to the vault. Absolute paths, traversal, `.`, `..`, and hidden folders such as `.obsidian` and `.trash` are rejected.

## Privacy and security

- No network requests or telemetry.
- Note contents are not read or written by the settings companion.
- The Obsidian Vault API is used only to enumerate folders.
- The plugin reads Obsidian's global `obsidian.json` registry outside the vault to bind permissions to the current vault's stable ID.
- Node filesystem writes are limited to the deterministic shared settings path outside the vault and the plugin's own Obsidian data. Vault plugin data cannot redirect that path.
- CLI diagnostics run only after an explicit click. They inspect an environment override or known installation paths, never the ambient `PATH`, invoke only `version` without a shell, and accept only recognized Obsidian version output.
- Actual note writes remain disabled by default and are handled by the separate bridge writer with preview and explicit confirmation.

Bridge Control therefore requires desktop-only Node access. It does not install updates, download executable code, run advertisements, or collect analytics. See [PRIVACY.md](PRIVACY.md) and [SECURITY.md](SECURITY.md).

## Build

```shell
npm ci
npm run check
```

For manual testing, copy `main.js`, `manifest.json`, and `styles.css` to:

```text
<vault>/.obsidian/plugins/bridge-control/
```

Then reload Obsidian and enable **Bridge Control** under Community plugins.

## Support and contributing

- [Support](SUPPORT.md)
- [Security policy](SECURITY.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

This project is independent and is not affiliated with or endorsed by Obsidian.
