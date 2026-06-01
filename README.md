# MRPL Towing LLC — Static Landing Site

Official one-page landing for **https://mrpltowing.com/** — built for Google Ads Final URL (no redirect to Google Maps).

## Business

- **Company:** MRPL Towing LLC / Mrpl Towing LLC
- **Phone:** [+1 971-563-8979](tel:+19715638979) · display: (971) 563-8979
- **Area:** Portland, OR and nearby areas
- **Hours:** 24/7

## Structure

```
/
├── index.html
├── css/styles.css
├── js/main.js
├── images/          ← add real MRPL photos here
├── privacy/index.html
├── robots.txt
└── sitemap.xml
```

## Required images (add manually)

| File | Use |
|------|-----|
| `images/mrpl-hero-truck.jpg` | Hero |
| `images/mrpl-truck-white-car.jpg` | Gallery |
| `images/mrpl-truck-red-car.jpg` | Gallery |
| `images/mrpl-truck-roadside.jpg` | Gallery |
| `images/mrpl-truck-building.jpg` | Gallery |
| `images/mrpl-logo-card.jpg` | Logo / OG image |

Until images exist, the site shows CSS placeholders.

## TODO before production

1. Replace GBP link `href="#"` in `index.html` with real Google Business Profile URL.
2. Add `favicon.ico` to site root.
3. Upload real photos to `/images/`.
4. Optional: business email in footer and privacy page.
5. Update `sameAs` in JSON-LD when GBP URL is known.

## Local preview

**Option A — open file (limited):**  
Double-click `index.html`. Absolute paths (`/css/...`) may not load; use Option B.

**Option B — simple local server (recommended):**

```bash
# Python 3
cd path/to/mrpltowing
python -m http.server 8080
```

Then open: http://localhost:8080/

**PowerShell (Windows):**

```powershell
cd "f:\ОЛЬГА аудит150б\mrpltowing"
python -m http.server 8080
```

## Cloudflare Pages deploy

1. Push this folder to Git (GitHub/GitLab).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → Connect repo.
3. **Build command:** leave empty (static, no build).
4. **Build output directory:** `/` (repository root).
5. Add custom domain `mrpltowing.com` and enable HTTPS.
6. Set canonical URL: prefer `https://mrpltowing.com/` (configure apex vs www once; avoid redirect chains for Google Ads).

## Google Ads checklist

- Final URL: `https://mrpltowing.com/`
- Display URL domain must match landing domain
- Phone visible above the fold with `tel:+19715638979`
- No fake address, reviews, or stock photos

## License

© MRPL Towing LLC. Site content for business use only.
