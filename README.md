# Jada Knowledge Garden

## Simple GitHub Pages entry

The simplest reading page is now the root `index.html`.

After GitHub Pages is enabled for this repository, open:

```text
https://wh201215.github.io/-/
```

This page does not require Astro, Vercel, local Node.js, or any app. It is a plain HTML directory that links directly to the files under `files/`.

To add more files, put them under one of these folders and add a new link in `index.html`:

- `files/后训练agent/`
- `files/强化学习/`
- `files/推荐算法/`

## Astro version

This is an Astro-based personal knowledge site meant to live on GitHub. The goal is simple:

- keep `Markdown`, `HTML`, and later `PDF / PPT` inside the repository
- group material with guide pages instead of loose files
- deploy automatically after each push
- open the site directly on phone or desktop

## Structure

```text
.
- public/
  - archive/
    - html/
    - markdown/
- src/
  - data/
  - layouts/
  - pages/
    - archive/
    - notes/
  - styles/
- astro.config.mjs
- package.json
```

## Local development

Install Node.js 18.20+ or 20+, then run:

```bash
npm install
npm run dev
```

## Automatic deployment with Vercel

This is the best fit for a site you want to read anywhere without keeping a local machine online.

1. Push this repository to GitHub `main`
2. Sign in to [Vercel](https://vercel.com/)
3. Choose `Add New Project`
4. Import this GitHub repository
5. Keep the default build setup
   - Framework Preset: `Astro`
   - Build Command: `astro build`
   - Output Directory: `dist`
6. Deploy

After that, every `git push` triggers a fresh deployment.

## Adding more content

### Add a new guide page

Create a page under `src/pages/notes/` and explain:

- context
- reading order
- key questions
- source file links

That keeps the homepage readable.

### Add source files

- HTML goes into `public/archive/html/`
- Markdown goes into `public/archive/markdown/`
- PDF can later go into `public/archive/pdf/`
- PPT can later go into `public/archive/ppt/`

If you want the homepage or archive page to show a new card, also update `src/data/site.ts`.
