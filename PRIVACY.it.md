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

Durante un'operazione gestita autenticata, Bridge Control legge la nota interessata tramite l'API Vault di Obsidian per verifica compare-and-swap, backup, modifica e controllo del risultato. Il bridge esterno 0.5.4 corrispondente usa uno snapshot UTF-8 esatto, limitato, di sola lettura e basato sulle impostazioni per ogni osservazione transazionale create/append e gestita, comprese preparazione, CAS, acquisizione backup, verifica dei blocchi e finale e classificazione del recupero. Le mutazioni create/append continuano a usare soltanto la CLI ufficiale allowlistata. Non cambiano categorie di dati, flussi di rete, permessi, campi del protocollo dei comandi o superfici di scrittura diretta.

Dopo un errore create/append successivo alla mutazione, il bridge esterno non esegue un ripristino CLI automatico e distruttivo. Conserva backup esatto ed evidenza audit composta solo da metadati, lascia intatta la nota osservata e può restituire `manual_recovery_required=true`. Bridge Control 0.5.4 riconosce i corrispondenti codici diagnostici limitati in Problemi recenti; non legge né mostra il corpo del backup.

## Accesso al filesystem locale fuori dal vault

Bridge Control usa le API filesystem Node soltanto per questi archivi esterni documentati: impostazioni condivise e relativo lock di proprietà o copia di quarantena per revoca; registro globale Obsidian di sola lettura; richieste di gestione autenticate e monouso; backup di recupero; record audit composti solo da metadati. Non usa mai le API filesystem Node per leggere o scrivere il percorso di una nota. Il contenuto delle note viene letto e modificato soltanto tramite API pubbliche di Obsidian.

Il plugin aggiorna un file locale:

- Windows: `%LOCALAPPDATA%\ObsidianBridge\settings.json`
- macOS: `~/Library/Application Support/ObsidianBridge/settings.json`
- Linux: `$XDG_CONFIG_HOME/ObsidianBridge/settings.json` oppure `~/.config/ObsidianBridge/settings.json`

Il file contiene identità e percorso del vault, vero `Vault.configDir`, modalità `protected`, `full` (Accesso autonomo) o `management` (Gestione completa), cartelle relative autorizzate e permessi esatti edit/move/trash. Le voci rigorose dalla versione 2 alla versione 4 migrano alla versione 5 senza inventare autorità di gestione. Un vault precedente resta senza accesso finché la propria istanza Obsidian non registra la cartella di configurazione reale. Non contiene note, prompt, risposte del modello o API key.

I normali dati Obsidian del plugin conservano una copia della modalità scelta, dello stato attivo, della modalità di lettura, degli elenchi relativi di cartelle leggibili/scrivibili, delle scelte granulari di gestione e fino a 100 ID di modifiche audit segnate come controllate. Questa copia rende utilizzabile il pannello ma non può autorizzare Accesso autonomo o Gestione completa: se manca la voce condivisa, viene sempre forzata ad Accesso protetto. Non contiene corpi delle note o dei backup.

Se una revoca non può essere verificata dopo un nuovo tentativo sicuro, Bridge Control può rinominare il file condiviso in una copia di quarantena `.revoked-…json` con data nella stessa cartella, così l'accesso autonomo si chiude in modo prudente. La copia contiene gli stessi metadati sensibili di identità e permessi del vault e va rimossa dopo il recupero.

Un amministratore può modificare esplicitamente questo percorso con `OBSIDIAN_BRIDGE_SETTINGS_PATH` nell'ambiente del processo di Obsidian. I dati del plugin del vault non possono cambiare la destinazione.

## Diagnostica dei candidati CLI

La diagnostica parte soltanto dopo un clic esplicito. Ricava un candidato da un override d'ambiente o da percorsi noti dell'installazione/registrazione CLI, non dal `PATH` generale. Bridge Control non avvia, esegue o interroga il candidato. Mostra localmente il risultato non autorevole; il bridge esterno effettua la verifica definitiva quando tenta un'operazione allowlistata che usa la CLI.

## Problemi recenti

Problemi recenti legge al massimo gli ultimi 128 KiB di `audit.ndjson` del bridge esterno, restituisce al massimo 20 record validati per l'ID stabile del vault corrente, rifiuta collegamenti simbolici e file non regolari e ignora in sicurezza le righe malformate. I record possono contenere percorso della nota, hash, operazione, modalità di autorizzazione, codice errore, esito del recupero, ID backup, data, ID modifica e valori opzionali e limitati `failure_stage` e `cause_code`, comprese le categorie sicure di recupero manuale. Non contengono mai messaggi grezzi delle eccezioni, stdout/stderr della CLI, testo delle note, contenuto proposto o corpo dei backup. I metadati diagnostici non sono un permesso, una conferma o un'autorizzazione a riprovare.

Senza override, Bridge Control e Obsidian Bridge usano la stessa cartella dati locale deterministica della piattaforma. Se `OBSIDIAN_BRIDGE_DATA_DIR` viene personalizzata per Codex, Obsidian deve ereditare la stessa variabile assoluta affinché il pannello mostri quel registro; il tool MCP del bridge legge comunque direttamente la cartella configurata dal writer.

## Attività di rete

Bridge Control non effettua richieste di rete. Download e aggiornamenti di Obsidian, Obsidian Sync, il bridge esterno e l'host AI/MCP hanno flussi e informative separate.

## Rimozione

Tornare all'accesso protetto revoca immediatamente la scrittura autonoma e conserva le vecchie cartelle. Disattivare il vault revoca tutto l'accesso ma conserva localmente identità e cartelle. La disinstallazione non elimina la voce condivisa né audit e backup del bridge esterno. Per cancellare questi metadati, arresta il bridge e rimuovi voce, audit/backup e dati locali secondo le tue esigenze di conservazione.

La versione inglese è in [PRIVACY.md](PRIVACY.md).
