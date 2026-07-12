# Privacy

Data di efficacia: 12 luglio 2026

Bridge Control è un software locale e open source per configurare i permessi. Non possiede servizi ospitati, account, pubblicità, analisi d'uso o telemetria gestita dal progetto.

## Dati consultati

Bridge Control utilizza:

- ID stabile Obsidian, nome visualizzato e percorso locale assoluto del vault corrente;
- registro globale `obsidian.json` fuori dal vault, letto soltanto in modalità limitata, per verificare ID stabile e percorso;
- elenco dei percorsi delle cartelle, esclusivamente per riempire il selettore visuale;
- permessi di lettura e scrittura scelti dall'utente;
- coda limitata dei metadati audit di scrittura per l'ID stabile del vault corrente;
- dati propri del plugin conservati da Obsidian;
- file condiviso delle impostazioni usato dal runtime esterno Obsidian Bridge.

Durante la configurazione e la diagnostica dei problemi recenti non legge né scrive il contenuto delle note. Può controllare se il percorso di una nota registrata nell'audit esiste e aprirla soltanto quando l'utente sceglie **Apri nota**.

## Archiviazione locale fuori dal vault

Il plugin aggiorna un file locale:

- Windows: `%LOCALAPPDATA%\ObsidianBridge\settings.json`
- macOS: `~/Library/Application Support/ObsidianBridge/settings.json`
- Linux: `$XDG_CONFIG_HOME/ObsidianBridge/settings.json` oppure `~/.config/ObsidianBridge/settings.json`

Il file contiene identità e percorso del vault, modalità protetta/completa e cartelle relative autorizzate. Le voci rigorose in versione 2 migrano alla versione 3 soltanto come accesso protetto. Non contiene note, prompt, risposte del modello o API key.

I normali dati Obsidian del plugin conservano una copia della modalità scelta, dello stato attivo, della modalità di lettura, degli elenchi relativi di cartelle leggibili/scrivibili e fino a 100 ID di modifiche audit segnate come controllate. Questa copia rende utilizzabile il pannello ma non può autorizzare l'accesso completo: se manca la voce condivisa, viene sempre forzata alla modalità protetta. Non contiene corpi delle note o dei backup.

Se una revoca non può essere verificata dopo un nuovo tentativo sicuro, Bridge Control può rinominare il file condiviso in una copia di quarantena `.revoked-…json` con data nella stessa cartella, così l'accesso autonomo si chiude in modo prudente. La copia contiene gli stessi metadati sensibili di identità e permessi del vault e va rimossa dopo il recupero.

Un amministratore può modificare esplicitamente questo percorso con `OBSIDIAN_BRIDGE_SETTINGS_PATH` nell'ambiente del processo di Obsidian. I dati del plugin del vault non possono cambiare la destinazione.

## Diagnostica CLI

La diagnostica parte soltanto dopo un clic esplicito. Controlla un override d'ambiente o percorsi noti dell'installazione/registrazione CLI, non il `PATH` generale. Il candidato viene eseguito soltanto con `version`, senza shell, ed è accettato solo se restituisce un formato versione Obsidian riconosciuto. Il risultato viene mostrato localmente.

## Problemi recenti

Problemi recenti legge al massimo gli ultimi 128 KiB di `audit.ndjson` del bridge esterno, restituisce al massimo 20 record validati per l'ID stabile del vault corrente, rifiuta collegamenti simbolici e file non regolari e ignora in sicurezza le righe malformate. I record possono contenere percorso della nota, hash, operazione, modalità di autorizzazione, codice errore, esito del recupero, ID backup, data, ID modifica e valori opzionali e limitati `failure_stage` e `cause_code`. Non contengono mai messaggi grezzi delle eccezioni, stdout/stderr della CLI, testo delle note, contenuto proposto o corpo dei backup. I metadati diagnostici non sono un permesso, una conferma o un'autorizzazione a riprovare.

Senza override, Bridge Control e Obsidian Bridge usano la stessa cartella dati locale deterministica della piattaforma. Se `OBSIDIAN_BRIDGE_DATA_DIR` viene personalizzata per Codex, Obsidian deve ereditare la stessa variabile assoluta affinché il pannello mostri quel registro; il tool MCP del bridge legge comunque direttamente la cartella configurata dal writer.

## Attività di rete

Bridge Control non effettua richieste di rete. Download e aggiornamenti di Obsidian, Obsidian Sync, il bridge esterno e l'host AI/MCP hanno flussi e informative separate.

## Rimozione

Tornare all'accesso protetto revoca immediatamente la scrittura autonoma e conserva le vecchie cartelle. Disattivare il vault revoca tutto l'accesso ma conserva localmente identità e cartelle. La disinstallazione non elimina la voce condivisa né audit e backup del bridge esterno. Per cancellare questi metadati, arresta il bridge e rimuovi voce, audit/backup e dati locali secondo le tue esigenze di conservazione.

La versione inglese è in [PRIVACY.md](PRIVACY.md).
