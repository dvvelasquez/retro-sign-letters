# Developer Portfolio

A lightweight, configurable, data-driven app that lets users create visual retro-style letter signs with animated effects and calculates pricing. All letters, effects, and pricing options are powered by JSON, making it easy to manage content and extend functionality.

The app is built with modular vanilla JavaScript, SASS for styling, and a clean MVC-style architecture for maintainable, reusable components.

## Features

- Create custom retro-style letter signs with animated effects
- Pricing calculation based on selected letters and options
- All configs managed via JSON files for letters, effects, and pricing
- Modular, component-based architecture with reusable functions
- Interactive UI for selecting letters and previewing messages
- Easy to extend or customize by updating JSON content

## Tech Stack
- **HTML5** – Semantic, accessible markup
- **CSS / SASS structure** – Bootstrap utilities and custom styling
- **Bootstrap 5** – Responsive grid, buttons, and layout utilities
- **JavaScript (ES6+)** – Modular, reusable functions for rendering components
- **JSON** – Dynamic management and centralized data for all content, easy to update
- **Git / .gitignore** – Source control with files excluded from commits for cleaner repository
- **GitHub** – Source control and integration with Netlify
- **Netlify** – Auto-deployment from GitHub

## Project Structure
<pre lang="markdown">
retro-sign/
├── assets/
│   └── images/
│       ├── retro-letters/
├── css/
│   └── components/
│   └── main.css
├── js/
│   ├── components/
│   │   ├── display-retro-sign.js
│   ├── config/
│   │   ├── retro-sign.config.json
│   ├── controllers/
│   │   ├── retro-sign.controller.js
│   ├── helpers/
│   │   ├── dom-helper.js
│   │   └── message-helper.js
│   └── main.js
├── scss/
│   └── components/
│       ├── _buttons.scss
│       ├── _retro-sign.scss
│   ├── _variables.scss
│   ├── main.scss
├── .gitignore
├── index.html
├── package-lock.json
└── package.json
└── README.json
</pre>

## Deployment
You can host this portfolio on Netlify, GitHub Pages, or any static site server. Just push your files and ensure your JSON files are included.

## Future Improvements

- **Additional animations:** Enhance letter and effect animations
- **Theme customization:** Light/Dark mode or retro color palettes
- **Discounts per length:** Support different price rules
- **More interactive UI elements:** Drag & drop, keyboard shortcuts
- **Add to Cart:** Add to cart features

## Getting Started
### Running Locally
Since ES6 modules and fetch() are used, you must run the app from a local or remote server.
You can use Live Server (VSCode extension) or run:
`npx live-server`
Open your browser at http://127.0.0.1:5500` (or as specified by Live Server).

# Clone the repository
git clone git@github.com:iorivilla84/retro-sign-letters.git
cd retro-sign-letters

# Install Sass if you want to compile SCSS to CSS
npm install --save-dev sass

# Optional with npm:
- To compile run: npm run watch:sass
### Replace 'css/main.css' with your output file if different
npx sass css/components/main.scss css/main.css
