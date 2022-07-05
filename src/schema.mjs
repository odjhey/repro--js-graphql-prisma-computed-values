import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefinitions = /* GraphQL */ `
  type Issue {
    id: String!
    title: String!
    description: String
    type: String!
  }

  type Query {
    hello: String!
    issues: [Issue!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    issues: (_, __, context, _info) => context.prisma.issue.findMany(),
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
