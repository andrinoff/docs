document.addEventListener('DOMContentLoaded', () => {

// --- CONFIGURATION ---
const REPO_NAME = 'andrinoff/docs'; // <--- CHANGE THIS!

// --- DOM Element References ---
const fileTreeContainer = document.getElementById('file-tree');
const contentDisplay = document.getElementById('content-display');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');
const repoDisplay = document.getElementById('repo-display');
const repoDisplayMobile = document.getElementById('repo-display-mobile');
const initialMessage = document.getElementById('initial-message');
// --- Responsive Elements ---
const menuToggleBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');

const GITHUB_API_BASE = 'https://api.github.com/repos/';
const isMobile = () => window.innerWidth < 768; // md breakpoint

/**
 * Initializes the application by fetching docs from the configured repository.
 */
function initialize() {
    if (!REPO_NAME || !REPO_NAME.includes('/')) {
            fileTreeContainer.innerHTML = '';
            showError('Invalid REPO_NAME configured. Please set it to "owner/repo".');
            const errorHtml = `<span class="text-red-400 font-semibold">Configuration Error</span>`;
            repoDisplay.innerHTML = errorHtml;
            repoDisplayMobile.innerHTML = errorHtml;
            return;
    }

    const repoHtml = `Viewing: <a href="https://github.com/${REPO_NAME}" target="_blank" rel="noopener noreferrer" class="font-mono text-blue-400 hover:underline">${REPO_NAME}</a>`;
    repoDisplay.innerHTML = repoHtml;
    repoDisplayMobile.innerHTML = repoHtml;

    setupEventListeners();
    fetchDocumentation(REPO_NAME);
}

/**
 * Sets up event listeners for UI elements like the mobile menu.
 */
function setupEventListeners() {
    menuToggleBtn.addEventListener('click', toggleSidebar);
    sidebarBackdrop.addEventListener('click', closeSidebar);
}

function toggleSidebar() {
    sidebar.classList.toggle('-translate-x-full');
    sidebarBackdrop.classList.toggle('hidden');
}

function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    sidebarBackdrop.classList.add('hidden');
}

/**
 * Main function to initiate the documentation fetching process.
 * @param {string} repoName - The owner/repo string.
 */
async function fetchDocumentation(repoName) {
    hideError();
    fileTreeContainer.innerHTML = '';
    if(initialMessage) initialMessage.classList.add('hidden');
    contentDisplay.innerHTML = '';
    showLoader();

    try {
        await fetchAndRenderTree(repoName, 'docs', fileTreeContainer);
    } catch (error) {
        showError(`Could not fetch docs for "${repoName}". Check if the repo is public and has a '/docs' folder. (Error: ${error.message})`);
        contentDisplay.innerHTML = '';
    } finally {
        hideLoader();
    }
}

/**
 * Recursively fetches directory contents and renders the file tree.
 * @param {string} repoName - The owner/repo string.
 * @param {string} path - The path to fetch.
 * @param {HTMLElement} container - The DOM element to append the tree to.
 */
async function fetchAndRenderTree(repoName, path, container) {
    const url = `${GITHUB_API_BASE}${repoName}/contents/${path}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

    const items = await response.json();

    if (!Array.isArray(items)) {
            showError(`The path '${path}' in '${repoName}' is not a directory.`);
            return;
    }

    if (items.length === 0 && path === 'docs') {
        showError(`The '/docs' directory in '${repoName}' is empty.`);
        return;
    }

    const folders = items.filter(item => item.type === 'dir').sort((a,b) => a.name.localeCompare(b.name));
    const files = items.filter(item => item.type === 'file' && item.name.toLowerCase().endsWith('.md')).sort((a,b) => a.name.localeCompare(b.name));

    for (const folder of folders) {
        const readmeUrl = `${GITHUB_API_BASE}${repoName}/contents/${folder.path}/README.md`;
        let readmeFile = null;
        try {
            const readmeResponse = await fetch(readmeUrl);
            if (readmeResponse.ok) readmeFile = await readmeResponse.json();
        } catch (e) { /* README not found, treat as regular folder */ }

        if (readmeFile) {
            const fileElement = document.createElement('div');
            fileElement.className = 'text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 cursor-pointer flex items-center gap-2';
            fileElement.innerHTML = `<i data-lucide="book-marked" class="w-4 h-4 text-blue-400 flex-shrink-0"></i><span class="truncate">${folder.name}</span>`;
            fileElement.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('#file-tree .bg-blue-900\\/50').forEach(el => el.classList.remove('bg-blue-900/50', 'text-white'));
                fileElement.classList.add('bg-blue-900/50', 'text-white');
                fetchAndDisplayFile(readmeFile);
                if (isMobile()) closeSidebar();
            });
            container.appendChild(fileElement);
        } else {
            const details = document.createElement('details');
            details.className = 'my-1';
            const summary = document.createElement('summary');
            summary.className = 'cursor-pointer text-white hover:bg-gray-700 rounded-md p-2 flex items-center gap-2 list-none';
            summary.innerHTML = `<i data-lucide="folder" class="w-4 h-4 text-blue-400 flex-shrink-0"></i><span class="truncate">${folder.name}</span>`;

            const subContainer = document.createElement('div');
            subContainer.className = 'ml-4 border-l border-gray-600 pl-4';

            details.appendChild(summary);
            details.appendChild(subContainer);
            container.appendChild(details);

            details.addEventListener('toggle', async (event) => {
                if (event.target.open && subContainer.innerHTML === '') {
                        await fetchAndRenderTree(repoName, folder.path, subContainer);
                }
            }, { once: true });
        }
    }

    for (const file of files) {
        if (file.name.toLowerCase() === 'readme.md') continue;

        const fileElement = document.createElement('div');
        fileElement.className = 'text-gray-300 hover:text-white hover:bg-gray-700 rounded-md p-2 cursor-pointer flex items-center gap-2';
        fileElement.innerHTML = `<i data-lucide="file-text" class="w-4 h-4 text-gray-400 flex-shrink-0"></i><span class="truncate">${file.name}</span>`;
        fileElement.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('#file-tree .bg-blue-900\\/50').forEach(el => el.classList.remove('bg-blue-900/50', 'text-white'));
            fileElement.classList.add('bg-blue-900/50', 'text-white');
            fetchAndDisplayFile(file);
            if (isMobile()) closeSidebar();
        });
        container.appendChild(fileElement);
    }
    lucide.createIcons();
}

/**
 * Fetches the content of a single file and displays it.
 * @param {object} file - The file object from the GitHub API.
 */
async function fetchAndDisplayFile(file) {
    showLoader();
    hideError();
    if(initialMessage) initialMessage.classList.add('hidden');

    try {
        const response = await fetch(file.download_url);
        if (!response.ok) throw new Error(`Download failed: ${response.status}`);
        const markdownContent = await response.text();

        // Sanitize and parse markdown
        contentDisplay.innerHTML = marked.parse(markdownContent);

        // Apply syntax highlighting
        contentDisplay.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });

    } catch (error) {
        showError(`Error displaying file "${file.name}": ${error.message}`);
    } finally {
        hideLoader();
    }
}

// --- UI Helper Functions ---
function showLoader() {
    loader.classList.remove('hidden');
    loader.classList.add('flex');
    contentDisplay.classList.add('hidden');
    if(initialMessage) initialMessage.classList.add('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
    loader.classList.remove('flex');
    contentDisplay.classList.remove('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

// --- Initialize the app ---
initialize();
lucide.createIcons();
});