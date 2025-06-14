import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { User } from "./user/index.js";

export async function createApolloGraphQLServer() {

  const server = new ApolloServer({
    typeDefs: `#graphql
      
      type Query {
        ${User.queries}
      }

      type Mutation { 
        ${User.mutations}
      }
    `,
    resolvers: {

      Query: {
        ...User.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutations
      }
    }
  });

  const {url} = await startStandaloneServer(server, {

    listen: {port: 4000},
    context: async ({req}) => (
      {
        token: req.headers.authorization? req.headers.authorization.split(" ")[1]: null
      }
    ),
    
  });
  
  return url;
}