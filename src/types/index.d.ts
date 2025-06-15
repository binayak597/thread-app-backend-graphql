declare interface CreateUserPayload {

  firstName: string
  lastName?: string
  email: string
  password: string
  
}

declare interface GetUserTokenPayload {
  email: string
  password: string
}