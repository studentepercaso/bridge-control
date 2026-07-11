# Contributing

Focused bug fixes, tests, accessibility improvements, translations, and documentation updates are welcome.

## Development

```shell
npm ci
npm run check
```

Use synthetic data in tests and screenshots. Never commit real vault names, note contents, personal paths, shared settings, tokens, credentials, backups, or audit records.

Changes affecting external filesystem access, CLI execution, vault identity, permission scope, network activity, or stored data must include tests and an update to the privacy/security documentation.

For vulnerabilities, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.
