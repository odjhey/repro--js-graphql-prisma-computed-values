import { createServer } from "@graphql-yoga/node";
import { schema } from "./schema.mjs";
import { createContext } from "./context.mjs";

async function main() {
  const server = createServer({ schema, context: createContext });
  await server.start();
}

main();
