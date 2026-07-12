# Bridge Control 0.5.2

## English

Bridge Control 0.5.2 is the matching companion release for the Obsidian Bridge 0.5.2 exact management-snapshot fix.

The previous bridge could prepare a source hash from CLI-normalized text. If a note had no final newline, Bridge Control's exact in-Obsidian content correctly differed from that normalized representation and the handler rejected every commit with `CHANGE_CONFLICT`, even when the file had not changed. The matching bridge now prepares the hash from a bounded exact UTF-8 snapshot, so both sides compare the same source representation.

Bridge Control's safety check is not relaxed: it still compares the exact current content immediately before replacement or frontmatter mutation and rechecks exact source state for move and trash. Genuine concurrent changes still fail closed before mutation.

This patch does not add a command, permission, protocol field, settings migration, audit field, direct note-write path, or network request. The fixed `bridge-control:commit` handler, version-4 shared-settings schema, edit/move/trash grants, one-time token-bound request, backups, metadata-only audit, and public Obsidian API operations remain unchanged.

Install the matching 0.5.2 releases, reload Obsidian, refresh or reinstall the Codex plugin, and start a new Codex task. Existing Bridge Control settings are preserved. Validate first with synthetic no-final-newline, LF, CRLF, and BOM notes, then confirm that a deliberate edit after prepare still returns a real conflict.

## Italiano

Bridge Control 0.5.2 è la release companion corrispondente alla correzione degli snapshot esatti di gestione in Obsidian Bridge 0.5.2.

Il bridge precedente poteva preparare l'hash sorgente da testo normalizzato dalla CLI. Se una nota non terminava con una nuova riga, il contenuto esatto visto da Bridge Control dentro Obsidian differiva correttamente da quella rappresentazione normalizzata e l'handler respingeva ogni commit con `CHANGE_CONFLICT`, anche quando il file non era cambiato. Il bridge corrispondente prepara ora l'hash da uno snapshot UTF-8 esatto e limitato, così entrambe le parti confrontano la stessa rappresentazione sorgente.

Il controllo di sicurezza di Bridge Control non viene indebolito: continua a confrontare il contenuto corrente esatto subito prima di una sostituzione o modifica del frontmatter e a ricontrollare lo stato sorgente esatto per spostamento e cestino. Le vere modifiche concorrenti continuano a chiudere l'operazione in modo prudente prima della modifica.

Questa patch non aggiunge comandi, permessi, campi di protocollo, migrazioni delle impostazioni, campi audit, percorsi di scrittura diretta o richieste di rete. Restano invariati l'handler fisso `bridge-control:commit`, lo schema condiviso versione 4, i permessi edit/move/trash, la richiesta monouso vincolata da token, i backup, l'audit composto soltanto da metadati e le operazioni tramite API pubbliche di Obsidian.

Installa le release 0.5.2 corrispondenti, ricarica Obsidian, aggiorna o reinstalla il plugin Codex e avvia una nuova attività Codex. Le impostazioni Bridge Control esistenti vengono conservate. Verifica prima con note sintetiche senza nuova riga finale, con LF, CRLF e BOM, poi conferma che una modifica intenzionale dopo prepare restituisca ancora un conflitto reale.
