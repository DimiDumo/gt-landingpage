import { readdir, stat } from "fs/promises";
import { join } from "path";

const PORT = 3500;

async function getVersionFolders(): Promise<string[]> {
  const entries = await readdir(".");
  const versions: string[] = [];

  for (const entry of entries) {
    if (entry.startsWith("v") && /^v\d+$/.test(entry)) {
      const s = await stat(entry);
      if (s.isDirectory()) {
        versions.push(entry);
      }
    }
  }

  return versions.sort((a, b) => {
    const numA = parseInt(a.slice(1));
    const numB = parseInt(b.slice(1));
    return numA - numB;
  });
}

function generateIndexPage(versions: string[]): string {
  const versionLinks = versions
    .map(
      (v) => `
      <a href="/${v}/" class="version-card">
        <span class="version-number">${v}</span>
        <span class="arrow">→</span>
      </a>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GalleryTalk Landing Pages</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      color: #fff;
      padding: 2rem;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      color: #888;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    .quick-nav {
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .quick-nav label {
      color: #888;
      font-size: 0.9rem;
    }
    .quick-nav input {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      padding: 0.5rem 1rem;
      color: #fff;
      font-size: 1rem;
      width: 100px;
    }
    .quick-nav input:focus {
      outline: none;
      border-color: #667eea;
    }
    .quick-nav input::placeholder {
      color: #666;
    }
    .versions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
    }
    .version-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 1rem 1.25rem;
      text-decoration: none;
      color: #fff;
      transition: all 0.2s ease;
    }
    .version-card:hover {
      background: rgba(102, 126, 234, 0.2);
      border-color: #667eea;
      transform: translateY(-2px);
    }
    .version-number {
      font-weight: 600;
      font-size: 1.1rem;
    }
    .arrow {
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .version-card:hover .arrow {
      opacity: 1;
    }
    .tip {
      margin-top: 2rem;
      padding: 1rem;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 8px;
      font-size: 0.9rem;
      color: #aaa;
    }
    .tip code {
      background: rgba(255,255,255,0.1);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'SF Mono', Monaco, monospace;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>GalleryTalk Landing Pages</h1>
    <p class="subtitle">${versions.length} versions available</p>

    <div class="quick-nav">
      <label for="quick-input">Quick jump:</label>
      <input type="text" id="quick-input" placeholder="v16" autofocus>
    </div>

    <div class="versions-grid">
      ${versionLinks}
    </div>

    <div class="tip">
      <strong>Tip:</strong> Type a version number (e.g., <code>v16</code> or just <code>16</code>) and press Enter to jump directly.
    </div>
  </div>

  <script>
    const input = document.getElementById('quick-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        let val = input.value.trim().toLowerCase();
        if (!val.startsWith('v')) val = 'v' + val;
        window.location.href = '/' + val + '/';
      }
    });
  </script>
</body>
</html>`;
}

function getMimeType(path: string): string {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  if (path.endsWith(".gif")) return "image/gif";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".ico")) return "image/x-icon";
  if (path.endsWith(".woff")) return "font/woff";
  if (path.endsWith(".woff2")) return "font/woff2";
  if (path.endsWith(".ttf")) return "font/ttf";
  return "application/octet-stream";
}

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

    // Root - show index
    if (pathname === "/" || pathname === "") {
      const versions = await getVersionFolders();
      return new Response(generateIndexPage(versions), {
        headers: { "Content-Type": "text/html" },
      });
    }

    // Handle version folders
    if (pathname.endsWith("/")) {
      pathname += "index.html";
    }

    // Try to serve the file
    const filePath = join(".", pathname);
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file, {
        headers: { "Content-Type": getMimeType(filePath) },
      });
    }

    // 404
    return new Response("Not found", { status: 404 });
  },
});

console.log(`
🎨 GalleryTalk Landing Page Server

   Local:   http://localhost:${PORT}

   Quick navigation:
   - http://localhost:${PORT}/v1/
   - http://localhost:${PORT}/v2/
   - ... and so on

   Press Ctrl+C to stop
`);
