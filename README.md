# Developer Portfolio

Retro Sign Letter Generator, a lightweight and configurable data-driven app that creates visual retro-style letter with animated effects, calculated pricing based on the given retro sign and add to and remove from cart with a mini cart and cart page feature. Built with modular vanilla JavaScript, JSON configs, SASS, and clean MVC-style architecture

The app is built with modular vanilla JavaScript, SASS for styling, Local Storage, and a clean MVC-style architecture for maintainable, reusable components.

## Features

- Create custom retro-style letter signs with animated effects
- Pricing calculation based on selected letters and options
- Add To Cart feature
- Off Canvas Mini Cart with item image and price calculation (Price per item, Subtotal, Tax, Shipping, Total)
- Cart Page with item image and price calculation (Price per item, Subtotal, Tax, Shipping, Total)
- All configs managed via JSON files for letters, effects, and pricing
- Modular, component-based architecture with reusable functions
- Interactive UI for selecting letters and previewing messages
- Easy to extend or customize by updating JSON content

## Tech Stack
- **HTML5** – Semantic, accessible markup
- **CSS / SASS structure** – Bootstrap utilities and custom styling
- **Bootstrap 5** – Responsive grid, buttons, and layout utilities
- **JavaScript (ES6+)** – Modular, reusable functions for rendering components
- **Local Storage** – Stores and retrieves cart data locally to maintain the shopping cart state between sessions.
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
│   └── product/
│       ├── components/
│   └── main.css
├── js/
│   ├── components/
│   │   ├── add-to-cart.js
│   │   ├── cart.js
│   │   ├── mini-cart.js
│   │   ├── retro-sign-letters.js
│   ├── config/
│   │   ├── retro-sign.config.json
│   ├── controllers/
│   │   ├── cart-items-obj.controller.js
│   │   ├── local-storage.controller.js
│   │   ├── product-page.controller.js
│   │   ├── retro-sign.controller.js
│   ├── helpers/
│   │   ├── cart-helper.js
│   │   └── dom-helper.js
│   │   └── footer.js
│   │   └── input-validations.js
│   │   └── message-helper.js
│   │   └── product-page-helper.js
│   ├── product/
│   │   └── components/
│   │       └── add-to-cart-event-handlers.js
│   └── display-retro-sign.js
│   └── main.js
├── scss/
│   └── base/
│       ├── _reboot.scss
│   └── components/
│       ├── _buttons.scss
│       ├── _cart.scss
│       ├── _footer.scss
│       ├── _line-item.scss
│       ├── _main-nav.scss
│       ├── _mini-cart.scss
│       ├── _retro-sign.scss
│   └── product/
│       ├── _add-to-cart.scss
│   ├── _variables.scss
│   ├── main.scss
├── .gitignore
├── cart.html
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

## Getting Started
### Running Locally
Since ES6 modules and fetch() are used, you must run the app from a local or remote server.
You can use Live Server (VSCode extension) or run:
`npx live-server`
Open your browser at http://127.0.0.1:5500` (or as specified by Live Server).

# Clone the repository
git clone git@github.com:dvvelasquez/retro-sign-letters.git
cd retro-sign-letters

# Install Sass if you want to compile SCSS to CSS
npm install --save-dev sass

# Optional with npm:
- To compile run: npm run watch:sass
### Replace 'css/main.css' with your output file if different
npx sass css/components/main.scss css/main.css
