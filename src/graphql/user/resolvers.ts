import { UserService } from "../../services/user.js"


const queries = {
  
  getUserToken: async(_: any, payload: GetUserTokenPayload) => {

    return await UserService.getUserToken(payload);
  },
  
  getCurrentLoggedInUser: async(_: any, parameters: any, context: any) => {

    console.log(context);

    if(context && context.user){

      const id = context?.user?.id;

      const isUser = await UserService.getUserById(id as string);

      return isUser;
    }
    throw new Error("i dont know who you are..");
  }
}

const mutations = {

  createUser: async (_: any, payload: CreateUserPayload) => {
    
    const result = await UserService.createUser(payload);

    return result.id;
  }

}

export const resolvers = {queries, mutations}