const { ApolloServer, PubSub } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');


require('dotenv').config();
const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});


mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: port });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })

 