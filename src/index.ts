import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema, Query, Resolver } from "type-graphql";

const PORT = process.env.PORT || 4000;

@Resolver()
class HelloResolver {
  @Query(() => String, { nullable: true })
  async hello() {
    return "Hello World!";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });
  const apolloServer = new ApolloServer({ schema: schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
};

main();
