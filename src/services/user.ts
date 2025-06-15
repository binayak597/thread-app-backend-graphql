import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../lib/db.js";
import JWT from "jsonwebtoken";

export class UserService {

  private static getHashedPassword(password: string, salt: string) {

    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    return hashedPassword;
  }

  public static async createUser(payload: CreateUserPayload){

    const {firstName, lastName, email, password} = payload;

    const salt = randomBytes(32).toString('hex');

    const hashedPassword = UserService.getHashedPassword(password, salt);

    const newUser = await prismaClient.user.create({
      data: {
        firstName,
        lastName: lastName || "",
        email,
        password: hashedPassword,
        salt
      }
    });

    return newUser;
  }

  private static async getUserByEmail(email: string) {

    return prismaClient.user.findUnique({where: {email}});
  }

  public static async getUserToken(payload: GetUserTokenPayload) {

    const {email, password} = payload;

    const isUser = await UserService.getUserByEmail(email);

    if(!isUser) throw new Error("User not found");

    const hashedPassword = UserService.getHashedPassword(password, isUser.salt);

    const isPasswordCorrect = isUser.password === hashedPassword;

    if(!isPasswordCorrect) throw new Error("Invalid password");

    const token = JWT.sign({id: isUser.id, email: isUser.email}, process.env.JWT_SECRET!);

    return token;


  }

  public static decodeJwtToken(token: string) {

    const payload = JWT.verify(token, process.env.JWT_SECRET!);

    return payload;
  }

  public static async getUserById(id: string) {

    const isUser = await prismaClient.user.findUnique({where: {id}});

    return isUser;
  }

}