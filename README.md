# ✦ meryem — portfolio

Source of **[miaaa3.github.io](https://miaaa3.github.io)**: the portfolio of Meryem Belmouaddine, M2 Computer Science & Mobility student (Université de Haute-Alsace), full-stack & mobile developer looking for a 6-month internship from February 2027.

Plain HTML/CSS/JS — no framework, no build step — hosted on GitHub Pages.

- 🇬🇧/🇫🇷 language toggle (follows the browser language, remembered locally)
- dark Bloom palette, one accent colour, 8px spacing scale
- project cards with autoplaying demo videos and a screenshot modal (`js/projects.js`)
- a typed code editor in the hero and an interactive terminal (try `help`)
- respects `prefers-reduced-motion`, keyboard accessible, responsive down to phone width

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

To add a project, append an entry to `js/projects.js` and drop its media in `assets/projects/<id>/`.
