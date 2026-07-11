# Bridge Control

[English](README.md) · [Italiano](README.it.md)

[![CI](https://github.com/studentepercaso/bridge-control/actions/workflows/ci.yml/badge.svg)](https://github.com/studentepercaso/bridge-control/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/studentepercaso/bridge-control)](https://github.com/studentepercaso/bridge-control/releases/latest)
[![Licenza: MIT](https://img.shields.io/badge/licenza-MIT-green.svg)](LICENSE)

Bridge Control è il companion desktop di Obsidian Bridge. Permette di scegliere cosa può leggere il bridge esterno e in quali cartelle può proporre scritture.

> [!IMPORTANT]
> Bridge Control configura i permessi ma non espone autonomamente le note a un'AI. Funziona insieme al runtime locale separato [Obsidian Bridge](https://github.com/studentepercaso/obsidian-bridge).

> [!WARNING]
> Questo è un progetto indipendente della community e non è affiliato né approvato da Obsidian o OpenAI. Inizia con un vault usa-e-getta o una cartella sintetica e conserva un backup indipendente.

## Installazione e utilizzo

1. Durante l'anteprima copia manualmente gli asset della release. Dopo l'approvazione della directory, installa e abilita **Bridge Control** dai plugin della community Obsidian.
2. Installa [Obsidian Bridge](https://github.com/studentepercaso/obsidian-bridge/releases/latest) per il runtime locale Codex/MCP.
3. Se richiesto dalla diagnostica, abilita la CLI ufficiale in **Obsidian → Impostazioni → Generale → Interfaccia a riga di comando**.
4. Apri **Impostazioni → Plugin della community → Bridge Control**.
5. Scegli le cartelle, abilita **Leggi** e, se serve, **Scrivi**, quindi salva l'accesso.

## Comportamento iniziale

Al primo avvio:

- l'accesso è associato all'identità del vault corrente;
- la lettura resta disattivata finché non scegli cartelle o l'intero vault idoneo;
- la scrittura è disattivata;
- nessuna cartella è preimpostata.

Il pannello include un selettore visuale ricercabile, checkbox separate **Leggi** e **Scrivi**, copertura ricorsiva delle sottocartelle, salvataggio esplicito con rilettura di verifica e diagnostica della CLI ufficiale di Obsidian.

## Impostazioni condivise

Il companion aggiorna atomicamente soltanto la voce del vault corrente nel file condiviso versione 2:

- Windows: `%LOCALAPPDATA%\ObsidianBridge\settings.json`
- macOS: `~/Library/Application Support/ObsidianBridge/settings.json`
- Linux: `$XDG_CONFIG_HOME/ObsidianBridge/settings.json` oppure `~/.config/ObsidianBridge/settings.json`

Conserva ID stabile del vault, percorso locale normalizzato, modalità di accesso e cartelle relative autorizzate. Non memorizza il corpo delle note.

Gli amministratori possono reindirizzare esplicitamente il file di configurazione condiviso con la variabile d'ambiente `OBSIDIAN_BRIDGE_SETTINGS_PATH` prima di avviare Obsidian. Bridge Control non accetta mai questo percorso dai dati del plugin del vault.

I percorsi devono essere relativi al vault. Sono rifiutati percorsi assoluti, attraversamenti, `.`, `..` e cartelle nascoste come `.obsidian` e `.trash`.

## Privacy e sicurezza

- Nessuna richiesta di rete o telemetria.
- Il companion di configurazione non legge né scrive il contenuto delle note.
- La Vault API di Obsidian viene usata soltanto per elencare le cartelle.
- Il plugin legge il registro globale `obsidian.json` fuori dal vault per associare i permessi all'ID stabile del vault corrente.
- Le scritture Node sono limitate al percorso deterministico del file condiviso e ai dati propri del plugin. I dati salvati nel vault non possono reindirizzare quel percorso.
- La diagnostica CLI parte soltanto dopo un clic esplicito. Controlla un override d'ambiente o percorsi di installazione noti, mai il `PATH` generale, esegue soltanto `version` senza shell e accetta soltanto un formato versione Obsidian riconosciuto.
- Le modifiche alle note restano disattivate inizialmente e vengono gestite dallo scrittore separato con anteprima e conferma esplicita.

Bridge Control richiede quindi l'accesso Node disponibile solo su desktop. Non installa aggiornamenti, non scarica codice eseguibile, non mostra pubblicità e non raccoglie dati analitici. Consulta [PRIVACY.it.md](PRIVACY.it.md) e [SECURITY.md](SECURITY.md).

## Build

```shell
npm ci
npm run check
```

Per una prova manuale copia `main.js`, `manifest.json` e `styles.css` in:

```text
<vault>/.obsidian/plugins/bridge-control/
```

Poi ricarica Obsidian e abilita **Bridge Control** tra i plugin della community.

## Supporto e contributi

- [Supporto](SUPPORT.md)
- [Sicurezza](SECURITY.md)
- [Contribuire](CONTRIBUTING.md)
- [Cronologia](CHANGELOG.md)

Questo progetto è indipendente e non è affiliato né approvato da Obsidian.
