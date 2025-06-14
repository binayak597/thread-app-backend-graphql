const queries = {
  hello: () => "heyy.. there! i am your graphql server"
}

const mutations = {

  createUser: (_: any, {firstName, lastName, email, password, saltRound}: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    saltRound: string
  }) => {
    return "randomId"
  }
}

export const resolvers = {queries, mutations}