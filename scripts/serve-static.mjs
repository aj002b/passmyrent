import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function getSafePath(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const requestedPath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  return resolve(join(root, requestedPath));
}

async function resolveFilePath(url) {
  const safePath = getSafePath(url);

  if (!safePath.startsWith(root)) {
    return null;
  }

  if (existsSync(safePath) && (await stat(safePath)).isFile()) {
    return safePath;
  }

  const indexPath = join(safePath, "index.html");
  if (existsSync(indexPath)) {
    return indexPath;
  }

  const notFoundPath = join(root, "404.html");
  return existsSync(notFoundPath) ? notFoundPath : null;
}

const server = createServer(async (request, response) => {
  const filePath = await resolveFilePath(request.url ?? "/");

  if (!filePath) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  const isNotFound = filePath.endsWith("404.html");
  response.writeHead(isNotFound ? 404 : 200, {
    "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
