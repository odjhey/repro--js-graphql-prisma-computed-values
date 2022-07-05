import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefinitions = /* GraphQL */ `
  type Issue {
    id: String!
    title: String!
    description: String
  }

  type Query {
    hello: String!
    issues: [Issue!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    issues: () => [], // RESUME HERE! <--- connect to prisma
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
