const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    apolloDay: String
  }

  type Event {
    name: String!
    date: String
    weather: String
  }
`;

const resolvers = {};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({
    engineProxy: {
      apiKey: 'service:ad-demo-1:Jr7nM_c4dTvw1e50SO9qnA',
      reporting: {
        endpointUrl: 'https://engine-staging-report.apollodata.com',
      },
    },
  })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
