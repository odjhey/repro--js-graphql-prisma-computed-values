import { execute, parse } from "graphql";
import { schema } from "./schema.mjs";

async function main() {
  const mq = parse(`
    query { 
      hello
    }
  `);

  const result = await execute({ schema, document: mq });

  console.log("result", result);
}

main();
