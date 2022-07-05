import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefinitions = /* GraphQL */ `
  type IssueType {
    label: String!
    description: String!
  }

  type Issue {
    id: String!
    title: String!
    description: String
    type: IssueType!
  }

  type Query {
    hello: String!
    issues: [Issue!]!
  }
`;

const ISSUE_TYPES = {
  ISSUE: {
    label: "ISSUE",
    description: "Issue",
  },
  PR: {
    label: "PR",
    description: "Pull Request",
  },
};

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    issues: (_, __, context, _info) => context.prisma.issue.findMany(),
  },

  Issue: {
    type: (parent) => {
      if (typeof parent.type === "string") {
        return ISSUE_TYPES[parent.type];
      }

      return parent.type;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
