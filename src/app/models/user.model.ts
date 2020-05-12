import { BaseModel } from "./base.model";

export class UserModel extends BaseModel{
    userId: number;
    userName: string;
    userPassword: string;
    firstName: string;
    lastName: string;
    userPhotoPath: string;
    description: string;
    userCvPath: string;
}