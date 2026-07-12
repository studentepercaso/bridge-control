# Bridge Control 0.5.0

## English

Bridge Control 0.5.0 adds **Full management**, a third per-vault access profile for users who want Obsidian Bridge to maintain existing notes without asking for approval on every individual operation.

Full management is never enabled by installation or migration. The user must open Bridge Control, choose the profile, select at least one exact capability, acknowledge the named vault and permission set, and complete a save/read-back verification. The three grants are independent:

- **Edit notes and frontmatter** permits exact whole-note replacement, literal in-place edits prepared by the bridge, and typed frontmatter set/remove operations.
- **Rename and move** permits a note to be renamed or moved to a currently empty destination. To keep Move isolated from Edit, the bridge does not automatically rewrite backlinks in other notes.
- **Move to Obsidian trash** permits recoverable removal through Obsidian's trash. Permanent deletion is not implemented.

Protected access and Autonomous access remain available. Autonomous access is the new label for the previous version-3 Full access and still supports only read, create, and append. Switching away from Full management clears every management grant.

### Public Obsidian execution path

The matching Obsidian Bridge 0.5.0 MCP server prepares a bounded preview, source hash, and short-lived one-time request. It invokes only the custom public CLI handler:

```text
bridge-control:commit request=<uuid> token=<256-bit-token>
```

The handler claims the request once, authenticates it, validates its strict shape and expiry, binds it to the current stable vault ID, and checks the relevant permission twice. Mutation then stays inside public Obsidian APIs:

- `Vault.process()` for atomic Markdown replacement;
- `Vault.process()` with Obsidian's public YAML helpers for atomic, hash-checked frontmatter updates;
- `Vault.rename()` for rename and move without rewriting other notes;
- `FileManager.trashFile()` for recoverable removal.

There is no generic command forwarding. Version 0.5.0 does not expose `eval`, a shell, arbitrary Obsidian commands, permanent delete, plugin installation, or unrestricted filesystem mutation.

### Backup, verification, and diagnostics

Before each managed mutation, Bridge Control creates a private local backup containing the previous note body and its hash. It rejects changed sources and occupied move destinations, verifies the operation's postcondition, records the outcome in the shared `audit.ndjson`, and attempts bounded rollback when a partially applied operation cannot be verified.

A managed result is considered successful by the bridge only when both `verified` and `audit_recorded` are true. **Recent problems** and the bridge's diagnostic tool can report `replace`, `frontmatter`, `move`, and `trash` events, destination paths, error codes, backup IDs, and recovery status. They never return note or backup bodies.

Recovery backups are intentionally local plaintext because they must be usable after a failed write. A replacement request can also contain the proposed new body while its short-lived request file exists; the handler consumes and removes that file before mutation. Neither data is uploaded by Bridge Control.

### Safe version-4 migration

Shared settings now use strict version 4:

- version 2 migrates to Protected access;
- version-3 Protected access remains Protected;
- version-3 Full access remains Autonomous and receives `edit=false`, `move=false`, and `trash=false`;
- management grants are invalid outside Full management;
- Full management is invalid unless at least one capability is selected.

Missing, malformed, stale, concurrently changed, or unverifiable policy data fails closed. Vault-local plugin cache is only a protected draft and cannot reactivate Autonomous or Full-management access. This release requires Obsidian 1.12.7 or later, the official Obsidian CLI enabled, and the matching Obsidian Bridge 0.5.0 package.

## Italiano

Bridge Control 0.5.0 aggiunge **Gestione completa**, un terzo profilo per vault destinato a chi vuole permettere a Obsidian Bridge di mantenere le note esistenti senza chiedere conferma per ogni singola operazione.

Gestione completa non viene mai attivata dall'installazione o da una migrazione. L'utente deve aprire Bridge Control, scegliere il profilo, selezionare almeno una capacità precisa, confermare il vault e l'insieme dei permessi indicati, quindi completare il salvataggio con rilettura di verifica. I tre permessi sono indipendenti:

- **Modifica note e frontmatter** autorizza la sostituzione esatta dell'intera nota, le modifiche letterali in-place preparate dal bridge e le operazioni tipizzate di aggiunta/rimozione nel frontmatter.
- **Rinomina e sposta** autorizza la rinomina o lo spostamento verso una destinazione libera. Per mantenere Sposta separato da Modifica, il bridge non riscrive automaticamente i backlink nelle altre note.
- **Sposta nel cestino di Obsidian** autorizza una rimozione recuperabile tramite il cestino. La cancellazione permanente non è implementata.

Accesso protetto e Accesso autonomo restano disponibili. Accesso autonomo è il nuovo nome del precedente Accesso completo versione 3 e continua a consentire soltanto lettura, creazione e aggiunta. Il passaggio da Gestione completa a un altro profilo azzera tutti i permessi di gestione.

### Percorso di esecuzione pubblico dentro Obsidian

Il server MCP Obsidian Bridge 0.5.0 corrispondente prepara un'anteprima limitata, l'hash sorgente e una richiesta monouso con scadenza breve. Invoca esclusivamente l'handler personalizzato pubblico della CLI:

```text
bridge-control:commit request=<uuid> token=<token-256-bit>
```

L'handler acquisisce la richiesta una sola volta, la autentica, ne valida forma rigorosa e scadenza, la associa all'ID stabile del vault corrente e controlla due volte il permesso specifico. La modifica resta poi all'interno delle API pubbliche di Obsidian:

- `Vault.process()` per la sostituzione atomica del Markdown;
- `Vault.process()` con gli helper YAML pubblici di Obsidian per aggiornare il frontmatter in modo atomico e controllato dall'hash;
- `Vault.rename()` per rinomina e spostamento senza riscrivere altre note;
- `FileManager.trashFile()` per la rimozione recuperabile.

Non esiste inoltro generico di comandi. La versione 0.5.0 non espone `eval`, shell, comandi Obsidian arbitrari, cancellazione permanente, installazione di plugin o modifiche filesystem senza limiti.

### Backup, verifica e diagnostica

Prima di ogni modifica gestita, Bridge Control crea un backup locale privato con il contenuto precedente della nota e il relativo hash. Rifiuta sorgenti cambiate e destinazioni già occupate, verifica la condizione finale, registra l'esito nel file condiviso `audit.ndjson` e tenta un rollback limitato quando non riesce a verificare un'operazione applicata solo in parte.

Il bridge considera riuscita un'operazione gestita soltanto quando `verified` e `audit_recorded` sono entrambi veri. **Problemi recenti** e lo strumento diagnostico del bridge possono mostrare eventi `replace`, `frontmatter`, `move` e `trash`, percorso di destinazione, codice errore, ID backup e stato del recupero. Non restituiscono mai il corpo delle note o dei backup.

I backup di recupero restano intenzionalmente in chiaro e in locale perché devono essere utilizzabili dopo una scrittura fallita. Anche una richiesta di sostituzione può contenere il nuovo corpo proposto per il breve tempo in cui esiste il file richiesta; l'handler consuma e rimuove quel file prima della modifica. Bridge Control non carica in rete nessuno di questi dati.

### Migrazione prudente alla versione 4

Le impostazioni condivise usano ora il formato rigoroso versione 4:

- la versione 2 migra ad Accesso protetto;
- Accesso protetto versione 3 resta protetto;
- Accesso completo versione 3 resta Accesso autonomo e riceve `edit=false`, `move=false` e `trash=false`;
- i permessi di gestione non sono validi fuori da Gestione completa;
- Gestione completa non è valida senza almeno una capacità selezionata.

Impostazioni mancanti, malformate, obsolete, cambiate in concorrenza o non verificabili chiudono l'accesso in modo prudente. La cache locale del plugin nel vault è soltanto una bozza protetta e non può riattivare Accesso autonomo o Gestione completa. Questa versione richiede Obsidian 1.12.7 o successivo, la CLI ufficiale di Obsidian abilitata e il pacchetto Obsidian Bridge 0.5.0 corrispondente.
