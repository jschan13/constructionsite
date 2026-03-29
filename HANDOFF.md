# Meridian Build Group — Website Handoff Guide

## Folder Structure

```
meridian-site/
│
├── index.html          ← Home page
├── projects.html       ← Projects gallery
├── about.html          ← About Us / team
│
├── css/
│   └── style.css       ← All styles (single file, well-commented)
│
└── js/
    └── main.js         ← All interactivity (single file, well-commented)
```

No build tools, no npm, no dependencies — just open any `.html` file in a browser or upload the whole folder to any web host.

---

## Hosting

Upload the entire folder to any static host:
- **cPanel / FTP** — Upload to `public_html/`
- **Netlify / Vercel** — Drag-and-drop the folder
- **GitHub Pages** — Push to a repo, enable Pages
- **AWS S3 / Cloudflare Pages** — Follow their static-site guides

The site uses one Google Fonts link (loaded from the CDN). No other external scripts or APIs.

---

## How to Add a New Project

1. Open `projects.html`
2. Find the `<!-- PROJECT GRID -->` comment
3. Copy any existing `<article class="proj-card">` block and paste it inside the grid
4. Update these fields:
   - `data-category` → one of: `commercial`, `residential`, `infrastructure`, `industrial`
   - `.proj-card__meta` → Location · Year
   - `<h3>` → Project name
   - `<p>` → Short description
   - `.proj-card__details span` → Area, duration, value
   - `.proj-card__tag` → Category label
5. **For a real photo**, replace the `<div class="proj-placeholder ...">` block with:
   ```html
   <img src="images/your-photo.jpg" alt="Project name" style="width:100%;height:100%;object-fit:cover;" />
   ```
   Place the image file in an `images/` folder in the root directory.

### Wide card (spans 2 columns)
Add class `proj-card--wide` to the `<article>` tag — best used for flagship or headline projects.

---

## How to Replace Placeholder Visuals with Real Photos

All project thumbnails and the hero feature image currently use inline SVG placeholders. To swap in a real photo:

```html
<!-- BEFORE (placeholder) -->
<div class="proj-placeholder proj-placeholder--1">
  <svg ...></svg>
</div>

<!-- AFTER (real photo) -->
<img src="images/apex-tower.jpg" alt="Apex Business Tower" style="width:100%;height:100%;object-fit:cover;" />
```

Recommended image sizes:
- Standard cards: **800 × 500 px** (16:10 ratio)
- Wide cards: **1200 × 514 px** (21:9 ratio)
- Featured section: **900 × 675 px** (4:3 ratio)

---

## How to Update Team Members

In `about.html`, find the `<!-- TEAM -->` section. Each team member is a `.team-card` block.

- Change initials in `.avatar-placeholder` (e.g. `VR`)
- Replace with a `<img>` tag if you have headshots (50×50 px, circular — add `border-radius:50%;object-fit:cover;width:64px;height:64px;` inline)
- Update name, role, bio, and qualifications

---

## How to Change Colour or Fonts

All design tokens are CSS variables at the top of `css/style.css`:

```css
:root {
  --amber:    #C8862A;   /* Primary accent — change to your brand colour */
  --charcoal: #1A1A1A;   /* Dark background */
  --cream:    #F5F3EE;   /* Light background */
  --stone:    #8C8070;   /* Body text / muted */
  --font-head: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}
```

To change the accent colour, update `--amber` and `--amber-dark` only — everything inherits automatically.

---

## Contact Form

The form in `index.html` is purely front-end (no server). It shows a success message on submit. To make it actually send emails, connect it to a free form service:

- **Formspree** (easiest): Replace the button's click handler in `main.js` with a `fetch` POST to `https://formspree.io/f/YOUR_ID`
- **Netlify Forms**: Add `netlify` attribute to the form element if hosting on Netlify
- **EmailJS**: Free client-side email sending

---

## Browser Support

The site uses standard CSS (Grid, custom properties, IntersectionObserver) supported in all modern browsers (Chrome, Firefox, Safari, Edge). IE11 is not supported.

---

## Quick Checklist Before Going Live

- [ ] Replace all SVG placeholders with real project photos
- [ ] Replace initials in team cards with actual headshots
- [ ] Update phone number, email, and address in footer (and `index.html` contact section)
- [ ] Update `<meta name="description">` tags on each page with your actual company description
- [ ] Add a `favicon.ico` in the root folder
- [ ] Set your custom domain on your hosting provider
