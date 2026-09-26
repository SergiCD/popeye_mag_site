import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { issues } from "../src/issues.js";

test("every magazine references an available, non-empty local image", async () => {
  assert.equal(new Set(issues.map((issue) => issue.id)).size, issues.length);
  for (const issue of issues) {
    const bytes = await readFile(
      new URL(`../public/images/${issue.image}`, import.meta.url),
    );
    assert.ok(bytes.length > 1000, issue.image);
  }
});

test("preview serves the site and rejects private project files", async (t) => {
  const child = spawn(process.execPath, ["server.mjs"], {
    env: { ...process.env, PORT: "5189" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  t.after(() => child.kill());
  await Promise.race([
    once(child.stdout, "data"),
    once(child, "exit").then(() => {
      throw new Error("Preview failed to start");
    }),
  ]);
  const home = await fetch("http://127.0.0.1:5189/");
  assert.equal(home.status, 200);
  assert.match(await home.text(), /POPEYE/);
  const module = await fetch("http://127.0.0.1:5189/src/main.js");
  assert.match(module.headers.get("content-type"), /javascript/);
  for (const path of [
    "/.git/config",
    "/package.json",
    "/src/missing.js",
    "/public/%2e%2e%2f.git/config",
  ]) {
    assert.equal(
      (await fetch(`http://127.0.0.1:5189${path}`)).status,
      404,
      path,
    );
  }
});
