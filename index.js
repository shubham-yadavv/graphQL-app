const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 8080;



const server = new ApolloServer({
    typeDefs,
    resolvers
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