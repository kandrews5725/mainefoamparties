# Maine Foam Parties — Website

Static site, no build step, no WordPress. Just HTML/CSS/JS + images.

## File structure

```
├── index.html          Home
├── pricing.html         Pricing
├── faq.html             Foam FAQ
├── contact.html         Contact (form)
├── css/style.css        All styling
├── js/script.js         Nav toggle, FAQ accordion, button micro-interaction
└── assets/              Logo, mascot, wordmark images (web-optimized)
```

## 1. Before you launch — 2 things to update

1. **Contact form endpoint** — in `contact.html`, find:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Sign up free at formspree.io, create a form, and swap in your real endpoint (same pattern as your VeriTech site).

2. **Real photos** — the homepage and gallery section have marked placeholder slots (`.gallery-slot` in `index.html`). Drop your real event photos into `/assets/`, then replace the placeholder `<div class="gallery-slot">` blocks with `<img>` tags pointing to them. Happy to do this edit for you once you send photos over.

3. **Social links** — Facebook/Instagram links currently point to the generic homepages (`facebook.com`, `instagram.com`). Swap in your actual profile URLs in the footer and contact page.

## 2. Hosting on GitHub Pages

1. Create a new repo, e.g. `kandrews5725/mainefoamparties`
2. Push all these files to the `main` branch (this folder's contents go at the repo root)
3. In the repo: **Settings → Pages → Source** → set to `main` branch, `/ (root)`
4. GitHub will publish at `https://kandrews5725.github.io/mainefoamparties/` within a few minutes

## 3. Connecting your domain (MaineFoamParties.com)

1. In the repo root, add a file named `CNAME` (no extension) containing just:
   ```
   www.mainefoamparties.com
   ```
2. At your domain registrar, add these DNS records for the apex + www:
   - `A` records for `@` pointing to GitHub Pages' IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` pointing to `kandrews5725.github.io`
3. Back in **Settings → Pages**, enter `www.mainefoamparties.com` as the custom domain and enable **Enforce HTTPS** once the cert provisions (can take up to 24 hrs)

## 4. Redirecting the other 3 domains

MaineFoam.com, 207FoamParties.com, and 207Foam.com should all forward (301 redirect) to `https://www.mainefoamparties.com`. GitHub Pages itself can't do this — it's done at the registrar level:
- Most registrars (GoDaddy, Namecheap, etc.) have a "Domain Forwarding" or "URL Forwarding" option in DNS settings for each domain
- Set each one to forward to `https://www.mainefoamparties.com` with a **301 (permanent) redirect**, "forward with masking" turned **off**

This consolidates your SEO under one domain while keeping the other three as safety-net backups people might type in.
