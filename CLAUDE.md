# GalleryTalk Landing Page Iterator

## Purpose

This repository is designed for rapidly iterating over different landing page designs and styles for GalleryTalk. The goal is to create multiple landing page variations that can be easily deployed via GitHub Pages for A/B testing or style exploration.

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

---

## Instructions for the LLM

### Understanding User Requests

Users may not use technical language. Here's how to interpret common requests:

**User wants to CREATE a new version:**
- "Create a new version"
- "Make a new landing page"
- "Try a different style"
- "Let's try something new"
- "Make another one"
- "New design please"

**User wants to EDIT an existing version:**
- "Change v5"
- "Edit the current one"
- "Fix the header in v3"
- "Update version 2"
- "Make the buttons bigger in v7"

**User wants to VIEW/SHARE:**
- "How do I see the website?"
- "How can I share this?"
- "Where is my landing page?"
- "Send me the link"

### When to Ask for Clarification

**ALWAYS ask the user to confirm which version** if:
- They say "edit the current one" but haven't specified which version they're working on
- They say "make changes" without specifying a version number
- It's ambiguous whether they want a new version or to edit an existing one

Example prompt: "Which version would you like me to edit? I can see versions v1 through v14 exist. Or would you like me to create a new version (v15)?"

### Creating a New Version (Step-by-Step)

When the user wants a new landing page version:

1. **Scan existing folders** - Check which `v*/` folders already exist
2. **Determine next version number** - Find the highest number and add 1 (e.g., if v14 exists, create v15)
3. **Create the folder** - Make `v15/` (or whatever the next number is)
4. **Create index.html** - Add the HTML file inside the new folder
5. **Use README.md for content** - Pull all text/copy from README.md
6. **Apply the requested style** - If user specified a style, use it. If not, ask what style they'd like
7. **Keep it self-contained** - All CSS should be inline or in the same folder

### Editing an Existing Version

When the user wants to modify an existing version:

1. **Confirm the version number** - Make sure you know which version (e.g., v5)
2. **Read the existing file** - Open `v5/index.html` to understand current state
3. **Make the requested changes** - Apply only what the user asked for
4. **Don't create a new version** - Edit in place unless user asks otherwise

---

## Sharing & Deployment (GitHub Pages)

This repository uses **GitHub Pages** for automatic deployment. When changes are merged to the `main` branch, the website is automatically published.

### How to Share a Landing Page

When a user asks "How do I share this?" or "Where can I see the website?", tell them:

1. **First, commit and push your changes** - Ask me to commit when you're ready
2. **Merge to main branch** - The changes need to be on the `main` branch to be deployed
3. **Access the live website** - After merging to main, the landing page will be available at:

   ```
   https://[github-username].github.io/[repo-name]/v15/
   ```

   (Replace `v15` with the actual version number)

4. **Share the link** - Copy that URL and share it with anyone!

**Example response to user:**
> "To share your landing page, we need to merge these changes to the main branch. Once merged, your v15 landing page will be live at: `https://[username].github.io/[repo-name]/v15/` - you can share that link with anyone!"

---

## Content Source of Truth

The `README.md` file contains all the text content extracted from the original GalleryTalk website (https://www.gallerytalk.io/). When creating new landing page variations:

1. **Always use README.md as the content source** - Don't modify the copy/text, only the styling and layout
2. **Each variation gets its own folder** - Named `v1/`, `v2/`, `v3/`, etc.
3. **Self-contained variations** - Each folder should be deployable on its own (include all CSS inline or in the same folder)

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

---

## Important Rules

- **Do not commit changes automatically** - Wait for the user to explicitly ask you to commit
- **Each landing page should be a complete, standalone HTML file** (or folder with assets)
- **Prefer modern CSS techniques** (flexbox, grid, custom properties)
- **Keep JavaScript minimal** unless specifically requested
- **When in doubt, ask the user** - It's better to confirm than to assume
