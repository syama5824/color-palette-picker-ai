| Category        | Micro-tool idea                                                  |
| --------------- | ---------------------------------------------------------------- |
| Text tools      | Text → Summary, review sentiment analyzer, grammar fixer         |
| Productivity    | Daily task planner, invoice auto-generator, resume formatter     |
| Utility         | Unit converter, currency converter, PDF → text extractor         |
| Developer Tools | JSON formatter, API tester, header generator                     |
| Creative        | AI caption generator, color palette picker, blog intro generator |

A single-purpose website where users can generate color palettes, copy hex codes, view shades, maybe randomize or extract palette from an image.

**1. Feature Scope (Keep it minimal & elegant)**

    Core MVP features:

        Generate random 5-color palette
        Click to copy HEX/RGB code
        Regenerate palette button
        Download palette as JSON or Image
        Smooth UI with Tailwind/Glassmorphism

    Optional nice add-ons (if time permits):

        Extract colors from uploaded image
        Save palette to local storage
        Gradient generator
        Bedrock prompt: AI suggest palette based on theme ("sunset", "retro neon")

**2. Architecture (Simple & front-end focused)**
    User → React/Vite Frontend (KIRO generated) → Palette Logic (JS) → Copy/Download

**3. Project folder structure**
color-palette-picker/
│── .kiro/
│── src/
│    ├── App.jsx
│    ├── components/PaletteCard.jsx
│    └── utils/colors.js
│── index.html
│── package.json
│── README.md

What You Can Do Now:
Open http://localhost:5173/ in your browser
Click "Generate New Palette" to see different color combinations
Click any color block to copy its hex code
Use "Export JSON" to save palettes for later use
Test on mobile - the responsive design adapts beautifully

**Bedrock approach**
User enters theme → API → Bedrock → color palette JSON → UI displays colors
