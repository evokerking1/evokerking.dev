const fs = require('fs');
const path = require('path');

// Change 'public' to your folder name (e.g., '.', 'dist', 'docs')
const TARGET_DIR = process.argv.slice(2); 

function generateIndex(dirPath) {

    console.log(`📂 Generating index for: ${dirPath}`);

    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    // Filter files: ignore index.html, hidden files, and the build script itself
    const files = items
        .filter(item => {
            const isIndexHtml = item.name.toLowerCase() === 'index.html';
            const isHidden = item.name.startsWith('.');
            return !isIndexHtml && !isHidden;
        })
        .map(item => ({
            name: item.name + (item.isDirectory() ? '/' : ''),
            url: encodeURIComponent(item.name) + (item.isDirectory() ? '/' : '')
        }))
        // Sort directories to the top, then alphabetically
        .sort((a, b) => {
            const aIsDir = a.name.endsWith('/');
            const bIsDir = b.name.endsWith('/');
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.name.localeCompare(b.name);
        });

    // Determine path relative to root for the header display
    const relativeTitle = path.relative(TARGET_DIR, dirPath);

    // Self-contained HTML string
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index of /${relativeTitle}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; line-height: 1.6; }
        h1 { font-size: 1.8rem; border-bottom: 2px solid #eaecef; padding-bottom: 10px; margin-bottom: 20px; }
        ul { list-style: none; padding: 0; }
        li { padding: 10px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; }
        li:hover { background-color: #fafafa; }
        a { color: #0366d6; text-decoration: none; font-weight: 500; font-size: 1.1rem; }
        a:hover { text-decoration: underline; }
        .icon { margin-right: 12px; font-size: 1.2rem; width: 24px; text-align: center; }
        .parent { font-style: italic; }
    </style>
</head>
<body>
    <h1>Index of /${relativeTitle.replace(/\\/g, '/')}</h1>
    <ul>
        ${dirPath !== TARGET_DIR ? `<li class="parent"><span class="icon">⬆️</span><a href="../">Parent Directory</a></li>` : ''}
        ${files.length === 0 ? '<li><em>(This directory is empty)</em></li>' : ''}
        ${files.map(f => `
            <li>
                <span class="icon">${f.name.endsWith('/') ? '📁' : '📄'}</span>
                <a href="${f.url}">${f.name}</a>
            </li>
        `).join('')}
    </ul>
</body>
</html>`;

    // Write the index.html physically into the directory
    fs.writeFileSync(path.join(dirPath, 'index.html'), htmlContent);

    // Recursively step into child directories
    items.forEach(item => {
        console.log(`Recursing through: ${item.name} (isDirectory: ${item.isDirectory()})`);
        if (item.isDirectory() && !item.name.startsWith('.')) {
            generateIndex(path.join(dirPath, item.name));
        }
    });
}

// Kick off the generation
generateIndex(TARGET_DIR);
console.log(`🎉 Successfully generated index.html files across /${TARGET_DIR}`);
