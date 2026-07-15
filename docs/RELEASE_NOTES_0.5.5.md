# Bridge Control 0.5.5 — Larger bridge write proposals / Proposte di scrittura del bridge più ampie

## English

Bridge Control 0.5.5 is a coordinated metadata and documentation release for Obsidian Bridge 0.5.5. The matching external bridge increases the UTF-8 content allowed in one create or append proposal from 8 KiB to 64 KiB, so a single prepared operation can carry more text without changing the permission model.

The larger proposal is still processed through the existing bounded write path. The exact resulting note remains limited to 1 MiB, and long content is still split on Unicode code-point boundaries into complete Obsidian CLI frames of at most 3072 UTF-8 bytes. Existing compare-and-swap checks, exact snapshots, backups, intermediate and final verification, audit evidence, and manual-recovery behavior remain in force.

This standalone release changes no Bridge Control runtime source, bundled `main.js`, settings schema, permission, management operation, command-protocol field, network behavior, direct filesystem note-write surface, or permanent-deletion capability. Install the matching Obsidian Bridge 0.5.5 release and reload Obsidian. No live-vault smoke test or atomic rollback is claimed by these notes.

## Italiano

Bridge Control 0.5.5 è una release coordinata di metadati e documentazione per Obsidian Bridge 0.5.5. Il bridge esterno corrispondente aumenta da 8 KiB a 64 KiB il contenuto UTF-8 consentito in una singola proposta create o append, così una sola operazione preparata può trasportare più testo senza modificare il modello dei permessi.

La proposta più ampia continua a passare attraverso il percorso di scrittura limitato esistente. La nota risultante esatta resta limitata a 1 MiB e i contenuti lunghi continuano a essere divisi sui confini dei punti di codice Unicode in frame completi della CLI di Obsidian di massimo 3072 byte UTF-8. Restano attivi i controlli compare-and-swap, gli snapshot esatti, i backup, la verifica intermedia e finale, l'evidenza audit e il comportamento di recupero manuale esistenti.

Questa release autonoma non modifica il sorgente runtime di Bridge Control, il bundle `main.js`, lo schema delle impostazioni, i permessi, le operazioni gestite, i campi del protocollo dei comandi, il comportamento di rete, la superficie di scrittura diretta delle note via filesystem o la possibilità di cancellazione permanente. Installa la release Obsidian Bridge 0.5.5 corrispondente e ricarica Obsidian. Queste note non dichiarano una prova live su un vault né un rollback atomico.
