import { makeExecutableSchema } from "@graphql-tools/schema";

const ISSUE_TYPE = {
  PR: {
    label: "PR",
    description: "Issue"
  },
  ISSUE: {
    label: "ISSUE",
    description: "Issue"
  }
}

const typeDefinitions = /* GraphQL */ `

  type IssueType {
    description: String!
    label: String!
    doubler(value: Int!): Int!
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
    issue (id: String!): Issue
    weirdIssue: Issue
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    issues: async (_, __, context, _info) => context.prisma.issue.findMany(),
    issue: async (_, {id}, context, _info) => { 
      const issue = await context.prisma.issue.findUnique({where: {id: parseInt(id, 10)}})

      return issue
    },

    weirdIssue: () => ({
      id: 3,
      createdAt: "2022-07-05T13:21:31.957Z",
      title: 'first issue',
      description: '',
      type: {
        label: "PR",
        description: "Pull Request"
      }
    })
  },

  Issue: {
    type: (parent, _arguments, _context, _info) => {
      if (typeof parent.type === 'string') {
        return ISSUE_TYPE[parent.type]
      }
      return parent.type
    },

    id: (parent, _arguments, _context, _info) => {
      console.log('log from id', parent)
      return parent.id
    },

    title: (parent, _arguments, _context, _info) => {
      console.log('log from title', parent)
      return parent.title
    },
  },

  IssueType: {
    doubler: (_, {value}) => value*2
  }
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
