
import { createApolloGraphQLServer } from "./graphql/index.js";


async function startServer() {

  const url = await createApolloGraphQLServer();

  console.log(`Server is running on port: -> ${url}`);
}

startServer();