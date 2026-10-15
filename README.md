# NovaSignal · nova2

Anteprima pubblica: https://novasignalstudio.github.io/nova2/

Sito cinematografico con film Higgsfield controllato dallo scroll, logo originale renderizzato in Three.js e pagine HTML in prospettiva. ORA e FORMA sono concept dimostrativi, non clienti reali.

## Struttura

- `docs/`: sito pubblicato da GitHub Pages (branch `main`, cartella `/docs`).
- `nova2-sorgenti.zip`: progetto modificabile completo, esclusi i video già presenti in `docs/` per evitare duplicazioni.
- `scripts/prepare-pages.mjs`: adatta i percorsi della build statica a `/nova2/`.
- `scripts/restore-videos.mjs`: ripristina i video nel progetto estratto.

## Modifiche e build

Estrarre `nova2-sorgenti.zip` nella cartella `source/`, quindi:

```sh
node scripts/restore-videos.mjs
cd source/app
bun install
bun run typecheck
bunx vite build --config vite.preview.config.ts
cd ../..
node scripts/prepare-pages.mjs
```

Salvare la cartella `docs/` aggiornata su `main` per pubblicare una nuova versione. La preview rimane `noindex`; `novasignal.it` non viene modificato.

Il modulo contatto prepara una bozza WhatsApp: l'invio resta al visitatore.
