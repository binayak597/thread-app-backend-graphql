import { UserService } from "../../services/user.js"


const queries = {
  
  getUserToken: async(_: any, payload: GetUserTokenPayload) => {

    return await UserService.getUserToken(payload);
  }
}

const mutations = {

  createUser: async (_: any, payload: CreateUserPayload) => {
    
    const result = await UserService.createUser(payload);

    return result.id;
  }

}

export const resolvers = {queries, mutations}