import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import { prismaClient } from "./lib/db.js";



async function startServer() {

  const server = new ApolloServer({
    typeDefs: `#graphql
      type Query {

        hello: String
        sayName(name: String!): String
      }

      type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!, saltRound: String!): Boolean
      }
    `,
    resolvers: {

      Query: {
        hello: () => "heyy there... i am a graphql server",
        sayName: (parent, {name}: {name: string}) => `heyy ${name}! what are you doing???`
      },

      Mutation: {
        createUser: async (_, {firstName, lastName, email, password, saltRound}: {
          firstName: string,
          lastName: string,
          email: string,
          password: string, 
          saltRound: string
        }) => {

          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              saltRound: "random_salt"
            }
          });
          return true;
        }
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