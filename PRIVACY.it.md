# Privacy

Data di efficacia: 11 luglio 2026

Bridge Control è un software locale e open source per configurare i permessi. Non possiede servizi ospitati, account, pubblicità, analisi d'uso o telemetria gestita dal progetto.

## Dati consultati

Bridge Control utilizza:

- ID stabile Obsidian, nome visualizzato e percorso locale assoluto del vault corrente;
- registro globale `obsidian.json` fuori dal vault, letto soltanto in modalità limitata, per verificare ID stabile e percorso;
- elenco dei percorsi delle cartelle, esclusivamente per riempire il selettore visuale;
- permessi di lettura e scrittura scelti dall'utente;
- dati propri del plugin conservati da Obsidian;
- file condiviso delle impostazioni usato dal runtime esterno Obsidian Bridge.

Durante la configurazione non legge né scrive il contenuto delle note.

## Archiviazione locale fuori dal vault

Il plugin aggiorna un file locale:

- Windows: `%LOCALAPPDATA%\ObsidianBridge\settings.json`
- macOS: `~/Library/Application Support/ObsidianBridge/settings.json`
- Linux: `$XDG_CONFIG_HOME/ObsidianBridge/settings.json` oppure `~/.config/ObsidianBridge/settings.json`

Il file contiene identità e percorso del vault, modalità di accesso e cartelle relative autorizzate. Non contiene note, prompt, risposte del modello o API key.

Un amministratore può modificare esplicitamente questo percorso con `OBSIDIAN_BRIDGE_SETTINGS_PATH` nell'ambiente del processo di Obsidian. I dati del plugin del vault non possono cambiare la destinazione.

## Diagnostica CLI

La diagnostica parte soltanto dopo un clic esplicito. Controlla un override d'ambiente o percorsi noti dell'installazione/registrazione CLI, non il `PATH` generale. Il candidato viene eseguito soltanto con `version`, senza shell, ed è accettato solo se restituisce un formato versione Obsidian riconosciuto. Il risultato viene mostrato localmente.

## Attività di rete

Bridge Control non effettua richieste di rete. Download e aggiornamenti di Obsidian, Obsidian Sync, il bridge esterno e l'host AI/MCP hanno flussi e informative separate.

## Rimozione

Disattivare il vault revoca immediatamente l'accesso ma conserva localmente identità e cartelle. Anche la disinstallazione non elimina la voce condivisa. Per cancellare questi metadati, arresta il bridge esterno e rimuovi la voce del vault dal file condiviso.

La versione inglese è in [PRIVACY.md](PRIVACY.md).
