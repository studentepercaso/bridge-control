# Bridge Control 0.5.1

## English

Bridge Control 0.5.1 is the companion release for Obsidian Bridge 0.5.1 structured write diagnostics.

Recent failed create and append records may include the optional bounded fields `failure_stage` and `cause_code`. **Recent problems** validates and displays this metadata together with the existing error and rollback state so the failure category is not lost behind a generic `write_failed` result.

The fields contain only short machine-readable metadata. Bridge Control does not read or display raw exception messages, Obsidian CLI stdout or stderr, note text, proposed content, or backup bodies. Unknown, malformed, oversized, or inconsistent records remain rejected or clearly reported as partial diagnostics.

Diagnostic fields are evidence only. They cannot enable a vault, grant a management capability, confirm a protected write, or authorize an automatic retry. After a failure, inspect the current note state and wait for explicit human direction before preparing another change.

This patch does not change access profiles, shared-settings schema version 4, management permissions, backup retention, or the available mutation operations. Use the matching Obsidian Bridge 0.5.1 release.

Update and reload Bridge Control before testing the 0.5.1 writer. Version 0.5.0 intentionally rejected unknown audit keys, so during a staggered update it can temporarily count a new 0.5.1 diagnostic record as malformed.

## Italiano

Bridge Control 0.5.1 è la release companion per la diagnostica strutturata delle scritture di Obsidian Bridge 0.5.1.

I record recenti di creazioni e aggiunte fallite possono includere i campi opzionali e limitati `failure_stage` e `cause_code`. **Problemi recenti** valida e mostra questi metadati insieme allo stato di errore e rollback già esistente, evitando che la categoria tecnica venga persa dietro il risultato generico `write_failed`.

I campi contengono soltanto brevi metadati leggibili dalla macchina. Bridge Control non legge né mostra messaggi grezzi delle eccezioni, stdout o stderr della CLI di Obsidian, testo delle note, contenuto proposto o corpo dei backup. I record sconosciuti, malformati, troppo grandi o incoerenti restano rifiutati o vengono segnalati chiaramente come diagnostica parziale.

I campi diagnostici sono soltanto evidenza. Non possono abilitare un vault, concedere un permesso di gestione, confermare una scrittura protetta o autorizzare un nuovo tentativo automatico. Dopo un errore, controlla lo stato attuale della nota e attendi indicazioni umane esplicite prima di preparare un'altra modifica.

Questa patch non modifica profili di accesso, schema condiviso versione 4, permessi di gestione, conservazione dei backup o operazioni di modifica disponibili. Usa la release Obsidian Bridge 0.5.1 corrispondente.

Aggiorna e ricarica Bridge Control prima di provare il writer 0.5.1. La versione 0.5.0 rifiutava intenzionalmente le chiavi audit sconosciute: durante un aggiornamento sfalsato può quindi contare temporaneamente un nuovo record diagnostico 0.5.1 come non valido.
