const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
    aNewThing: String
    # Gets the Apollo Day event 💯
    apolloDay: String
    # DEPRECATED: supporting service no longer exists 😥
    myOldField: String @deprecated(reason: "this does nothing")
  }

  type Event {
    name: String!
    # Format: YYYY-MM-DD
    date: String
    # Plain english description of the weather
    weather: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'What it do 🤔🤨',
    apolloDay: () => ({
      name: 'Apollo Day',
      date: '2018-05-31',
      weather: () =>
        new Promise((resolve, reject) => {
          let wait = setTimeout(() => {
            resolve('Too cold');
          }, 2000);
        }),
    }),
  },
};

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
