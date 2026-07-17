# Bridge Control 0.5.6 — Synchronized-file compatibility / Compatibilità con file sincronizzati

## English

Bridge Control 0.5.6 is a coordinated metadata and documentation release for Obsidian Bridge 0.5.6. The matching external bridge no longer treats a Windows `ctime` change by itself as proof that note content changed. It performs repeated bounded reads from the same stable file handle and accepts a snapshot only after the bytes agree and a final metadata window is quiet.

Real concurrent changes still fail closed: identity, path, size, `mtime`, truncation, growth, or differing bytes reject the operation. Limits remain 64 KiB per create/append proposal, 1 MiB for the resulting observed document, and 3072 UTF-8 bytes per Unicode-safe CLI frame.

This standalone release changes no Bridge Control runtime source, bundled `main.js`, settings schema, permission, management operation, command-protocol field, network behavior, direct filesystem note-write surface, or permanent-deletion capability. Install matching 0.5.6 components, reload Obsidian, reinstall or refresh the Codex plugin, and start a new Codex task before testing.

## Italiano

Bridge Control 0.5.6 è una release coordinata di metadati e documentazione per Obsidian Bridge 0.5.6. Il bridge esterno corrispondente non considera più una variazione isolata di `ctime` su Windows come prova di modifica del contenuto della nota. Esegue letture ripetute e limitate dallo stesso handle stabile e accetta lo snapshot soltanto quando i byte coincidono e una finestra finale dei metadati resta stabile.

Le vere modifiche concorrenti continuano a essere respinte: cambi di identità, percorso, dimensione, `mtime` o byte, troncamenti e crescite fanno fallire l'operazione. I limiti restano 64 KiB per proposta create/append, 1 MiB per il documento risultante osservato e 3072 byte UTF-8 per ogni frame CLI sicuro rispetto a Unicode.

Questa release autonoma non modifica il sorgente runtime di Bridge Control, il bundle `main.js`, lo schema delle impostazioni, i permessi, le operazioni gestite, i campi del protocollo dei comandi, il comportamento di rete, la superficie di scrittura diretta delle note via filesystem o la possibilità di cancellazione permanente. Installa i componenti 0.5.6 corrispondenti, ricarica Obsidian, reinstalla o aggiorna il plugin Codex e avvia una nuova attività Codex prima della prova.
