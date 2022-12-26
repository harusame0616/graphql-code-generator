import express from "express";
import crypto from "crypto";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { buildSchema } from "graphql";
import { Resolver, Resolvers } from "./src/generated/graphql";
import fs from "fs/promises";

const main = async () => {
  const app = express();

  const typeDefs = await fs.readFile("./schema.graphql", {
    encoding: "utf-8",
  });

  const resolvers: Resolvers = {
    Query: {
      book: async (parent, args, context, info) => {
        console.log({ parent, args, context, info });
        return {
          bookId: crypto.randomUUID(),
          title: "book1",
          author: { authorId: crypto.randomUUID(), name: "saitou" },
        };
      },
      books: async (parent, args, context, info) => {
        console.log(parent, args, context, info);

        return [
          {
            bookId: crypto.randomUUID(),
            title: "book1",
            author: { authorId: crypto.randomUUID(), name: "saitou" },
          },
          {
            bookId: crypto.randomUUID(),
            title: "book2",
            author: { authorId: crypto.randomUUID(), name: "saitou" },
          },
          {
            bookId: crypto.randomUUID(),
            title: "book3",
            author: { authorId: crypto.randomUUID(), name: "saitou" },
          },
        ];
      },
    },
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(60001, "0.0.0.0");
};
main();
