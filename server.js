import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.PORT) || 3000;
const rootDir = fileURLToPath(new URL(".", import.meta.url));

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const server = createServer(async (request, response) => {
  const urlPath = request.url === "/" ? "/index.html" : request.url;
  const relativePath = urlPath.startsWith("/src/")
    ? urlPath.slice(1)
    : join("public", urlPath.slice(1));
  const filePath = join(rootDir, relativePath);

  try {
    const file = await readFile(filePath);
    const contentType = mimeTypes[extname(filePath)] || "text/plain; charset=utf-8";
    response.writeHead(200, { "Content-Type": contentType });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`Settings form available at http://localhost:${port}`);
});
