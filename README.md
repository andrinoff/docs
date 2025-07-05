# GitHub Docs Viewer

![GitHub last commit](https://img.shields.io/github/last-commit/andrinoff/docs?style=for-the-badge&logo=github)


A clean, simple, and deployable web application that dynamically fetches and displays documentation from a `/docs` directory in any public GitHub repository. It provides a user-friendly interface with a file tree for easy navigation.

## ✨ What is this?

This project provides a polished frontend to read documentation stored in a GitHub repository. Instead of navigating through GitHub's default file viewer, this tool presents the content in a structured, readable format with a proper file explorer, rendered Markdown, and syntax highlighting. It's designed to be forked, configured in under a minute, and deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

The live version of this repository documents other projects by [@andrinoff](https://github.com/andrinoff). You can see it here: [docs.andrinoff.com](https://docs.andrinoff.com/)

## 🚀 Features

-   **Dynamic Content Loading**: Fetches repository structure and file content directly from the GitHub API.
-   **File Tree Navigation**: Automatically generates a collapsible file and folder tree from the `/docs` directory.
-   **Markdown Rendering**: Parses Markdown files (`.md`) into clean HTML using `marked.js`.
-   **Syntax Highlighting**: Beautifully highlights code blocks using `highlight.js` with the `atom-one-dark` theme.
-   **Responsive Design**: A mobile-first interface with a collapsible sidebar, built with Tailwind CSS.
-   **Easy Configuration**: Simply change one line of JavaScript to point the viewer to your own repository.
-   **Icons & Styling**: Uses Lucide icons for a modern and clean aesthetic.

## 🛠️ How to Use

You can set up your own documentation site with this tool in just a few steps.

**1. Get the Code**

Fork this repository or download it as a ZIP.

**2. Configure the Repository**

Open the `script.js` file and find the following line:

```javascript
// --- CONFIGURATION ---
const REPO_NAME = 'andrinoff/docs'; // <--- CHANGE THIS!
```

Change the value of the `REPO_NAME` constant to the public GitHub repository you want to display. The format must be `owner/repository-name`.

**3. Deploy!**

That's it! Deploy the contents of the folder to your favorite static web hosting provider.

-   **Vercel**: Link your forked GitHub repository and it will deploy automatically.
-   **GitHub Pages**: Enable GitHub Pages in your repository settings on the `main` branch.
-   **Netlify**: Drag and drop the project folder into the Netlify dashboard.

## 💻 Technologies Used

-   **HTML5**: The structure of the web page.
-   **Tailwind CSS**: For utility-first styling and responsive design.
-   **JavaScript (ES6+)**: To handle API requests, DOM manipulation, and application logic.
-   **GitHub API**: Used to fetch the repository file tree and content.
-   **Marked.js**: For parsing and converting Markdown to HTML.
-   **Highlight.js**: For syntax highlighting in code blocks.
-   **Lucide Icons**: For clean and lightweight SVG icons.

## 📂 Project Structure

```
.
├── docs/                  # Your documentation folder in the target repo.
│   └── Repo Name/
│       └── README.md
├── index.html             # Main HTML file.
├── script.js              # Core application logic.
├── style.css              # Custom styles for Markdown rendering.
└── README.md              # This file.
```

The application is designed to fetch content from a `/docs` directory in the root of the configured `REPO_NAME`. It will automatically detect folders and `.md` files within it.

