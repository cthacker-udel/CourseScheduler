import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user/user.schema";

/**
 * The users service, handling all operations involving the users collection
 */
@Injectable()
export class UserService {
    /**
     * @param userModel DI UserModel, allows for operations on the user database
     */
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    /**
     * This function takes in a username, and returns the user document associated with the username
     * @param {string} username The username (email) of the user
     * @returns {User} The associated user with the email
     */
    findOne = async (username: string): Promise<User | undefined> => {
        return this.userModel.findOne({ email: username }).exec();
    };
}
