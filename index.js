const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    waddup: String
    hello: String
    # Gets the Apollo Day event 💯
    apolloDay: Event
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
          }, Math.random() * 5000);
        }),
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: 'service:ad-demo-1:Jr7nM_c4dTvw1e50SO9qnA',
    endpointUrl: 'https://engine-staging-report.apollodata.com',
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
