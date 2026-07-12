# Bridge Control 0.5.3 — Matching writer-safety release / Release coordinata per la sicurezza del writer

## English

Bridge Control 0.5.3 is the companion release for Obsidian Bridge 0.5.3. It updates version metadata, documentation, and the read-only audit diagnostics parser/UI so Recent problems accepts and classifies the two bounded manual-recovery codes. The companion settings schema, CLI command protocol, permission model, management handler, and public Obsidian API mutation code are unchanged.

The matching bridge now uses settings-backed, bounded exact UTF-8 read-only snapshots for every protected/autonomous create/append observation: prepare, commit CAS, backup capture, intermediate and final verification, and recovery classification. Note mutation still uses only the allowlisted official Obsidian CLI. The legacy environment-only writer fails closed and requires migration to Bridge Control because normalized CLI stdout is not an exact CAS source. An append whose resulting document would exceed 1 MiB and a create target whose parent folder does not already exist are rejected before mutation.

Create/append no longer attempts destructive automatic CLI rollback after a post-mutation failure. It preserves exact backup and metadata-only audit evidence, leaves the observed state untouched, and reports `manual_recovery_required=true` with `WRITE_FAILED_MANUAL_RECOVERY_REQUIRED` or `VERIFICATION_FAILED_MANUAL_RECOVERY_REQUIRED`; partial create remains `delete_disabled`. This is not atomic rollback, and no live-vault smoke-test result is claimed here.

## Italiano

Bridge Control 0.5.3 è la release companion di Obsidian Bridge 0.5.3. Aggiorna metadati di versione, documentazione e diagnostica audit di sola lettura affinché Problemi recenti accetti e classifichi i due nuovi codici limitati di recupero manuale. Schema delle impostazioni, protocollo dei comandi CLI, modello dei permessi, handler di gestione e codice di mutazione tramite API pubbliche di Obsidian restano invariati.

Il bridge corrispondente usa ora snapshot UTF-8 esatti, limitati, di sola lettura e basati sulle impostazioni per ogni osservazione create/append protetta o autonoma: prepare, CAS al commit, acquisizione backup, verifiche intermedie e finali e classificazione del recupero. Le mutazioni delle note continuano a usare soltanto la CLI ufficiale allowlistata. Il writer legacy configurato solo tramite ambiente si chiude in modo prudente e richiede la migrazione a Bridge Control, perché lo stdout normalizzato della CLI non è una sorgente CAS esatta. Append viene rifiutato se il documento risultante supererebbe 1 MiB e create viene rifiutato se la cartella padre non esiste già, prima della mutazione.

Create/append non tenta più rollback CLI automatici e distruttivi dopo un errore successivo alla mutazione. Conserva backup esatto ed evidenza audit composta solo da metadati, lascia intatto lo stato osservato e restituisce `manual_recovery_required=true` con `WRITE_FAILED_MANUAL_RECOVERY_REQUIRED` o `VERIFICATION_FAILED_MANUAL_RECOVERY_REQUIRED`; una create parziale resta `delete_disabled`. Non si tratta di rollback atomico e qui non viene dichiarato alcun esito di test live sul vault.
