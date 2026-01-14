# GalleryTalk Landing Page Iterator

## Purpose

This repository is designed for rapidly iterating over different landing page designs and styles for GalleryTalk. The goal is to create multiple landing page variations that can be easily deployed (e.g., via Netlify Drop) for A/B testing or style exploration.

## Structure

```
gt-landingpage/
├── README.md          # Source of truth for all website content
├── CLAUDE.md          # This file - repo documentation
├── .vibe-images/      # Reference screenshots of the original website
└── v1/                # Landing page variation 1
    └── index.html
└── v2/                # Landing page variation 2
    └── index.html
└── v3/                # Landing page variation 3
    └── index.html
... (and so on)
```

## Workflow

### Content Source of Truth

The `README.md` file contains all the text content extracted from the original GalleryTalk website (https://www.gallerytalk.io/). When creating new landing page variations:

1. **Always use README.md as the content source** - Don't modify the copy/text, only the styling and layout
2. **Each variation gets its own folder** - Named `v1/`, `v2/`, `v3/`, etc.
3. **Self-contained variations** - Each folder should be deployable on its own (include all CSS inline or in the same folder)

### Creating New Variations

When asked to create a new landing page variation:

1. Create a new folder (e.g., `v5/`)
2. Create an `index.html` file inside
3. Pull content from `README.md`
4. Apply the requested style/design approach
5. Ensure CSS is self-contained (inline or in same folder)
6. The folder should be directly uploadable to Netlify Drop

### Design Directions to Explore

Possible style variations include:
- Minimalist/clean
- Bold/brutalist
- Gradient-heavy
- Dark mode
- Playful/animated
- Corporate/professional
- Retro/vintage
- Glassmorphism
- Neumorphism
- Typography-focused

### Reference Images

The `.vibe-images/` folder contains screenshots of the original GalleryTalk website for visual reference:
- Hero section and main features
- Featured galleries and artists section
- Pricing page

## Notes

- Do not commit changes automatically - wait for explicit instruction to commit
- Each landing page should be a complete, standalone HTML file (or folder with assets)
- Prefer modern CSS techniques (flexbox, grid, custom properties)
- Keep JavaScript minimal unless specifically requested
