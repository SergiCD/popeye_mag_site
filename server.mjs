import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve(process.env.SERVE_DIST === "1" ? "dist" : ".");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (pathname.split('/').some(segment => segment.startsWith('.'))) {
      res.writeHead(404).end('Not found');
      return;
    }
    if (
      pathname !== "/" &&
      pathname !== "/index.html" &&
      !/^\/(src|public)\//.test(pathname)
    ) {
      res.writeHead(404).end("Not found");
      return;
    }
    const file = resolve(
      root,
      "." + (pathname === "/" ? "/index.html" : pathname),
    );
    if (!file.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(body);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(Number(process.env.PORT || 5173), "127.0.0.1", () =>
  console.log("POPEYE ready at http://localhost:" + (process.env.PORT || 5173)),
);
