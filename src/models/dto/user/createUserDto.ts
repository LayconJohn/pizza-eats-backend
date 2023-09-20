import { User } from "src/models/entity/userEntity";

export interface CreateUser extends User {
    passwordConfirmation?: string;
    encryptedPassword?: string;
}