# GentleSip — Custom Shopify theme for GetGentleSip

A custom Shopify theme built for **GetGentleSip** — temperature-display bottles.
Gold accent branding, black/white friendly, mobile-ready, worldwide shipping copy baked in.

---

## STEP 1 — Put this code on GitHub

You have two ways. **Way A (drag & drop)** is easiest if you've never used GitHub.

### Way A — Upload through the GitHub website (no software to install)
1. Go to <https://github.com> and create a free account (if you don't have one).
2. Click the **+** (top right) → **New repository**.
3. Name it `getgentlesip-theme`. Choose **Private**. Click **Create repository**.
4. On the new repo page click **uploading an existing file**.
5. Open this folder on your computer. Select **all the folders** inside it
   (`assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`)
   and the `README.md`, and drag them into the GitHub upload box.
6. Click **Commit changes**.

> Important: upload the **folders themselves**, not a zipped file. GitHub keeps the folder structure.

### Way B — Git command line (if you know git)
```bash
cd "path/to/this/folder"
git init
git add .
git commit -m "Initial GentleSip theme"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/getgentlesip-theme.git
git push -u origin main
```

---

## STEP 2 — Connect the GitHub repo to Shopify
1. In Shopify admin go to **Online Store → Themes**.
2. Click **Add theme → Connect from GitHub**.
3. Authorize GitHub, pick the `getgentlesip-theme` repo and the `main` branch.
4. Shopify imports the theme. Click **Customize** to preview it.
5. When it looks right, click **Publish**.

**No GitHub remote / it won't connect?** Fallback: select all the folders, right-click → **Send to → Compressed (zip) folder**, then in Shopify use **Add theme → Upload zip file**. (The zip must contain the folders at its top level.)

---

## STEP 3 — Shopify setup (do these or the store won't work right)

The theme is the *look*. Shopify holds the *products, payments and shipping*. Set these up:

### Products & collections
- **Products → Add product** — add your 500 bottles (or 2 listings: "White Bottle" and "Black Bottle", each with stock count). Add your photos and descriptions.
- **Products → Collections → Create collection** — make a collection called **Best sellers** (or **All Bottles**). The homepage "Featured products" section needs a collection picked.

### Navigation menus (the header & footer use these)
- **Online Store → Navigation**.
- Edit **Main menu** — add links: Home, Shop, Contact, etc.
- Edit **Footer menu** — add links: Return Policy, FAQ, Contact.

### Make it yours (Theme editor — Customize button)
- Upload your **gold logo** under *Brand & logo*.
- Colors are already set to gold `#C9A14A` + black/white — change under *Colors* if needed.
- On the homepage, click the **Featured products** section and choose your collection.

### Payments (Settings → Payments)
- Turn on **Shopify Payments** — covers credit & debit cards.
- Add **PayPal** — this also gives your customers **Venmo** at checkout (US).
- **"Pay in 4"** — turn on **Shop Pay Installments** (needs Shopify Payments, US) and/or **PayPal Pay Later**. Payment icons show in the footer automatically.

### Shipping (Settings → Shipping and delivery)
- Set your US rates and an **international / Rest of world** zone (you ship worldwide).

### Taxes (Settings → Taxes and duties)
- Shopify auto-calculates US sales tax once you add your business address and the states you have a tax obligation in. If unsure, talk to an accountant — but Shopify handles the math.

### Pages (Online Store → Pages → Add page)
- **Return Policy** — paste the one you wrote.
- **Contact** — create the page, then on the right set **Theme template = page.contact**. This adds a working contact form.
- Optional but recommended for trust: **FAQ** and **About Us**.

### Customer accounts
- Keep **Settings → Customer accounts** on **"New customer accounts"** (the default). This theme is built for it — Shopify hosts the login/account pages.

### Going live
- While you set up, **Online Store → Preferences** keeps the store password-protected — visitors see the branded "Coming soon" page in this theme (it collects emails for you).
- When ready, remove the password to launch.

### Domain
- You don't have one yet: **Settings → Domains → Buy new domain** (e.g. `getgentlesip.com`), or connect one you buy elsewhere.

---

## What's in this theme

| Folder | What it is |
|--------|------------|
| `layout/` | Page shell + the "Coming soon" password page |
| `templates/` | Home, product, collection, cart, search, page, blog, 404, gift card |
| `sections/` | Editable blocks: hero, benefits, featured products, image+text, newsletter, header, footer |
| `snippets/` | Reusable product card + pagination |
| `assets/` | `base.css` (styles) + `theme.js` (menu, cart qty, product variants) |
| `config/` | Theme settings (logo, colors, fonts, social links) |
| `locales/` | English text strings |

Built so that when you add bottle **sizes** later, the product page automatically shows size options and updates the price.
