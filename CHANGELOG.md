# Changelog

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
