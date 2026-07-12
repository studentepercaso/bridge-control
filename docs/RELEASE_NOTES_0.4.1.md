# Bridge Control 0.4.1

## English

Bridge Control 0.4.1 fixes the settings-panel rerender crash that could appear immediately after Full access was successfully enabled. The permission had already been stored and verified; the failure affected only the panel because two CSS class names were passed to `DOMTokenList` as one token.

The hotfix passes each class as an individual token and adds a regression test. It also reports a later panel-refresh problem separately from a real permission-save failure. Existing version-3 permissions remain unchanged.

## Italiano

Bridge Control 0.4.1 corregge l'arresto del pannello impostazioni che poteva comparire subito dopo l'attivazione riuscita di Accesso completo. Il permesso era già stato salvato e verificato; l'errore riguardava soltanto il pannello perché due classi CSS venivano passate a `DOMTokenList` come un unico token.

La correzione passa ogni classe come token separato e aggiunge un test di regressione. Inoltre distingue un successivo problema grafico da un vero errore di salvataggio del permesso. I permessi versione 3 esistenti restano invariati.
