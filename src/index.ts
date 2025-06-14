import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";



async function startServer() {

  const server = new ApolloServer({
    typeDefs: `#graphql
      type Query {

        hello: String
        sayName(name: String!): String
      }
    `,
    resolvers: {

      Query: {
        hello: () => "heyy there... i am a graphql server",
        sayName: (parent, {name}: {name: string}) => `heyy ${name}! what are you doing???`
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

  console.log(`Server is running on port: -> ${url}`);
}

startServer();