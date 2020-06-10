import { serve, listenAndServe } from "https://deno.land/std@0.55.0/http/server.ts";
import * as flags from "https://deno.land/std/flags/mod.ts";

const DEFAULT_PORT = 8080;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

if (isNaN(port)) {
  console.error("Port is not a number.");
  Deno.exit(1);
}

console.log("http://localhost:" + port + "/");

listenAndServe({ port: port }, async (req) => {
  if (req.method === "GET" && req.url === "/") {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html"
      }),
      body: await Deno.open("./public/index.html")
    });
  }
});