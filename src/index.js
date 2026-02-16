require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

async function start() {
  const app = express();

  // Connect MongoDB
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected ");

  // Apollo GraphQL
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error("Startup error ", err.message);
});
