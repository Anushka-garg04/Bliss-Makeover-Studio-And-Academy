# 💎 Bliss Makeover Studio and Academy — Official Website

A premium, fully responsive multi-page website for **Bliss Makeover Studio and Academy**, Bulandshahr's complete beauty destination, along with **Bliss Adorn**, its in-house jewellery boutique.

**Live demo:** open `index.html` in any browser (no build step required)

---

## ✨ Highlights

- **7 hand-built pages** — Home, Services, Gallery, About, Testimonials, Contact, and a dedicated Bliss Adorn jewellery catalogue.
- **Dark champagne-chrome luxury design** — near-black base with metallic gold gradients, Playfair Display + Inter typography.
- **WhatsApp-first business flow** — every booking/enquiry button opens WhatsApp with a pre-filled message. No backend, no forms, no email needed.
- **Festive offers section** — current Teej & Rakhi price-ladder combos (₹500 – ₹2,500), easy to swap out each season.
- **PWA-ready** — installable via service worker + web manifest, works offline.
- **Zero external API keys** — Google Maps renders through a keyless embed; Instagram links to the live handle.

---

## 🗂 Pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage: hero, Teej & Rakhi offers, services preview, Bliss Adorn intro, about preview, client testimonials, Instagram tiles, footer |
| `services.html` | Full service menu with pricing, add-on options, FAQ and CTA blocks (bridal, party makeup, hair, facials, waxing, jewellery) |
| `gallery.html` | Filterable portfolio (Bridal / Party / Hair / Facials / Before & After) with lightbox |
| `about.html` | Studio story, team profiles, studio features and achievements |
| `testimonials.html` | Featured review carousel, filterable review cards and summary stats |
| `contact.html` | Contact cards, WhatsApp/social quick actions, Google Maps embed, FAQ accordion, open-hours check |
| `jewellery.html` | Bliss Adorn catalogue — sell / rent / custom pieces with per-item WhatsApp enquiry and category filters |

---

## 🎨 Design System

All tokens live as CSS variables in `css/style.css` under `:root`.

### Colors

| Token | Value | Usage |
|---|---|---|
| `--bg-0` → `--bg-3` | `#0a0a0c` → `#1c1c23` | Charcoal background layers |
| `--gold` | `#d4af37` | Primary gold accent |
| `--gold-light` | `#f0d98c` | Highlight gold |
| `--gold-deep` | `#8a6a1f` | Deep gold / shadows |
| `--chrome` | `linear-gradient(115deg, #fdf3dc, #e9cf87, #b8922b, #e9cf87)` | Metallic gold text/buttons |
| `--whatsapp` | `#25d366` | WhatsApp CTAs |

### Typography

- **Playfair Display** — headings (elegant serif)
- **Inter** — body and UI (clean sans-serif)

---

## 🧱 File Structure

```
Bliss makeup studio/
├── index.html              # Homepage
├── services.html           # Services + pricing + FAQ
├── gallery.html            # Portfolio grid + lightbox
├── about.html              # Story + team
├── testimonials.html       # Reviews carousel
├── contact.html            # Contact + map + FAQ
├── jewellery.html          # Bliss Adorn jewellery catalogue
├── css/
│   ├── style.css           # Design system + shared styles + homepage
│   ├── services.css        # Services page
│   ├── gallery.css         # Gallery + lightbox
│   ├── about.css           # About page
│   ├── testimonials.css    # Testimonials page
│   ├── contact.css         # Contact page
│   └── jewellery.css       # Jewellery catalogue
├── js/
│   ├── script.js           # Shared: nav, animations, WhatsApp, PWA register
│   ├── services.js         # Services interactions
│   ├── gallery.js          # Filters + lightbox
│   ├── about.js            # About animations
│   ├── testimonials.js     # Carousel + filters
│   ├── contact.js          # Hours/status + accordion
│   └── jewellery.js        # Catalogue filters + reveal
├── manifest.json           # PWA manifest (gold theme)
├── sw.js                   # Service worker (offline cache, v5)
├── assets/
│   ├── images/             # Local images
│   └── favicon.ico         # Favicon
└── README.md
```

---

## 🚀 Getting Started

1. **Open the site** — double-click `index.html`, or serve it:

   ```bash
   # with VS Code
   npx serve .              # or right-click index.html → Open with Live Server
   ```

2. **Offline / PWA** — the service worker caches pages and assets once opened in a browser (note: `.html` pages served over `file://` won't register the SW; use a local server or HTTPS).

3. **Point SEO tools** at search engines normally by deploying the folder as static hosting (GitHub Pages, Netlify, Vercel, or any cPanel host).

---

## 📲 WhatsApp Integration (no backend)

Every call-to-action builds a `wa.me` link with a pre-filled message:

```
https://wa.me/919410016655?text=...
```

To change the business number, search-replace `919410016655` across all `.html` files (`wa.me`, tel links, and footer).

---

## 🎨 Customization Guide

### Offers section

The homepage offers ladder lives in `index.html` inside `<section id="offers">`. Each `.ladder-row` = one tier:

```html
<div class="ladder-row">
  <div class="ladder-price">₹1,000/-</div>
  <div class="ladder-info">
    <h3>Package name</h3>
    <ul class="ladder-items">
      <li>Service included</li>
      <!-- …more services -->
    </ul>
  </div>
  <div class="ladder-cta">
    <span class="ladder-valid">Validity text</span>
    <a href="<wa.me link>" class="btn btn-primary">Book Now</a>
  </div>
</div>
```

### Jewellery catalogue

`jewellery.html` → `<div class="jewel-grid" id="jewelleryGrid">`. Each `.jewel-card` has a `data-category` attribute matched by the filter buttons (bridal / necklaces / earrings / rings / fashion). Per-piece WhatsApp enquiry links are pre-filled with the piece name.

### Gallery

`gallery.html` items use `data-category` attributes driven by `js/gallery.js` (`all`, `bridal`, `party`, `hair`, `facial`, `before-after`).

### Hours & open-status logic

- Displayed hours: **Every day 10 AM – 8 PM** (`contact.html`, `js/contact.js`)
- The day/time based "open now / closed" indicator is computed in `js/contact.js`.

### Images

Keep the Unsplash placeholders or drop real photos into `assets/images/` and reference them locally. All `<img>` elements use `loading="lazy"` and descriptive `alt` text.

### PWA

- Edit `manifest.json` for name/theme/icon changes.
- After editing cached assets, bump `CACHE_NAME` in `sw.js` (currently `bliss-makeup-studio-v5`) so visitors receive fresh files.

---

## 🔍 SEO

- Per-page `title`, `meta description`, and `keywords`.
- Open Graph tags on the homepage.
- Mobile-first responsive layout with semantic HTML (`nav`, `section`, `header`, `footer`).

---

## 🧰 Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid, flexbox, gradients; no frameworks
- **Vanilla JavaScript (ES6)** — zero dependencies (Font Awesome CDN only)
- **PWA** — manifest + service worker for offline access

---

## 🌐 Browser Support

Latest Chrome, Edge, Firefox, Safari — desktop and mobile (iOS Safari, Chrome Mobile).

---

## 📄 License

All rights reserved. Created for Bliss Makeover Studio and Academy, Bulandshahr.

Business address: H No 2, Opp Dr Path's Lab, DM Road, Bulandshahr, UP · Open every day 10 AM – 8 PM

---

*Made with 💛 for beauty enthusiasts — managed via GitHub.*