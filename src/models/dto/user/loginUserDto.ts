import { User } from "../../entity/userEntity";


export interface LoginUser extends Omit<User, "username"> {}