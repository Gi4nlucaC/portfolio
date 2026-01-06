# Portfolio (GitHub Pages)

Sito portfolio statico (HTML/CSS/JS) pronto per essere pubblicato su GitHub Pages.

## Dove modificare i contenuti

- Sito: cartella `site/`
- Progetti: `site/data/projects.json`
- Testi principali: `site/index.html`
- Stile: `site/styles.css`

## Preview in locale

Opzione A (Python):

- `cd site`
- Windows spesso funziona anche: `py -m http.server 8000`
- Oppure: `python -m http.server 8000`
- Apri `http://localhost:8000`

Opzione B (VS Code Live Server):

- Apri `site/index.html` e avvia Live Server

## Pubblicazione su GitHub Pages (consigliato: via Actions)

1. Crea un repo su GitHub (es. `portfolio`).
2. Carica questi file nel repo (branch `main`).
3. Su GitHub vai in **Settings → Pages**.
4. In **Build and deployment**, scegli **Source: GitHub Actions**.
5. Fai un push su `main`: la workflow `Deploy to GitHub Pages` partirà e pubblicherà il contenuto di `site/`.

Dopo il deploy, l’URL sarà tipicamente:

- Repo “project pages” (es. `portfolio`): `https://<USERNAME>.github.io/<REPO>/`
- Repo “user pages” (nome repo = `<USERNAME>.github.io`): `https://<USERNAME>.github.io/`

## Note

- Aggiorna i placeholder (nome, email, link social) in `site/index.html`.
- Inserisci i tuoi progetti in `site/data/projects.json`.
