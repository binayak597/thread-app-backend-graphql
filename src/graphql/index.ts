import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { User } from "./user/index.js";
import { UserService } from "../services/user.js";

export async function createApolloGraphQLServer() {

  const server = new ApolloServer({
    typeDefs: `#graphql
      
      ${User.typeDefs}
      
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
    context: async ({req}) => {

      try {
        
        const token = req.headers.authorization? req.headers.authorization.split(" ")[1]: null;

        if(!token) throw new Error("Unauthorized -> No token found");

        const payload = UserService.decodeJwtToken(token as string);

        if(!payload) throw new Error("Invalid token");

        const userInfo = payload;

        return {user: userInfo};
      } catch (error: any) {

        return {error: error.message}
        
      }
    },
    
  });
  
  return url;
}