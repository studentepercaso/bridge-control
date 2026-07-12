# Bridge Control 0.4.0

## English

Bridge Control 0.4.0 adds two clear per-vault profiles:

- **Protected access** keeps the existing read/write folder choices and per-change confirmation;
- **Full access** grants autonomous read/create/append across the eligible vault after one explicit acknowledgement naming that vault.

The panel preserves protected folder choices while full access is active and can return to protected access immediately. It also adds **Recent problems**, which reads only a bounded tail of local audit metadata, explains recovery, checks whether the affected note currently exists, lets the user open it, and stores up to 100 reviewed change IDs without note or backup bodies.

Failed events are retained independently from newer successful writes. Unsafe or partially malformed audit data is shown as a warning, never as a green “no problems” state. The local Obsidian plugin cache cannot restore full access when the authoritative shared policy is missing.

Full-access transitions are checked against the latest shared state under the settings lock and verified before release. Failed increases restore the previous policy; failed revocations reassert the narrower target or quarantine the shared file instead of restoring autonomy. Local panel writes are serialized, and the normal audit location is deterministic across Codex and Obsidian.

Strict version-2 settings migrate to version 3 as protected access only. No update enables full access silently. Full access requires the matching Obsidian Bridge 0.4.0 Codex plugin; older bridge versions fail closed on version-3 settings.

## Italiano

Bridge Control 0.4.0 aggiunge due profili chiari per ogni vault:

- **Accesso protetto** conserva le cartelle di lettura/scrittura e la conferma per ogni modifica;
- **Accesso completo** consente lettura, creazione e aggiunta autonoma nell'intero vault idoneo dopo un'unica conferma esplicita che indica quel vault.

Il pannello conserva le cartelle protette durante l'accesso completo e può tornare immediatamente all'accesso protetto. Aggiunge inoltre **Problemi recenti**, che legge soltanto una coda limitata dei metadati audit locali, spiega il recupero, controlla se la nota interessata esiste, permette di aprirla e salva fino a 100 ID di modifiche già controllate senza corpi delle note o dei backup.

Gli eventi falliti restano visibili indipendentemente dalle scritture riuscite più recenti. Un audit non sicuro o parzialmente malformato viene mostrato come avviso, mai in verde come “nessun problema”. La cache locale del plugin Obsidian non può ripristinare l'accesso completo quando manca la configurazione condivisa autorevole.

Le transizioni verso l'accesso completo vengono controllate sulla configurazione condivisa più recente sotto lock e verificate prima del rilascio. Gli aumenti falliti ripristinano la policy precedente; le revoche fallite riconfermano la policy più stretta o mettono il file condiviso in quarantena senza ripristinare l'autonomia. I salvataggi locali del pannello sono serializzati e la cartella audit normale è deterministica tra Codex e Obsidian.

Le impostazioni rigorose in versione 2 migrano alla versione 3 soltanto come accesso protetto. Nessun aggiornamento abilita l'accesso completo in silenzio. L'accesso completo richiede il plugin Codex Obsidian Bridge 0.4.0 corrispondente; le versioni precedenti del bridge chiudono l'accesso in modo prudente davanti alle impostazioni versione 3.
