import express, { Express } from "express";
import dotenv from 'dotenv';
dotenv.config();
// import path from 'path';
import { connect as connectDatabase } from './config/database';
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefs"; 
import { resolvers } from "./resolvers/index.resolvers";  
import {requireAuth} from "./middlewares/auth.middleware";
// import clientRoutes from "./routes/client/index.route";
// import adminRoutes from "./routes/admin/index.route";
// import { systemConfig } from "./config/system";
// import bodyParser from "body-parser";
// import methodOverride from "method-override";

const startServer = async () => {

  connectDatabase();
  
  const app: Express = express();
  const port: string | number = process.env.PORT || 3000;

  // GraphQL API
  app.use("/graphql", requireAuth);

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    context: ({ req }) => ({ ...req }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/graphql" });
  
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
}

startServer();