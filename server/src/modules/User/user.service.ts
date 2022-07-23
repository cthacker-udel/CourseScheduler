import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import {
    type CreateUserDTO,
    ServerSideCreateUserDTO,
} from "src/dto/user/create.user.dto";
import { User } from "src/entities";
import { CryptoService, type EncodingResult } from "../Crypto/crypto.service";

/**
 * The users service, handling all operations involving the users collection
 */
@Injectable()
export class UserService {
    /**
     * @param userModel DI UserModel, allows for operations on the user database
     */
    constructor(
        @InjectRepository(User, "mongo")
        private usersRepository: Repository<User>,
        private readonly cryptoService: CryptoService,
    ) {}

    /**
     * This function takes in a CreateUserDTO, and returns a ServerSideUserDTO, with the salt and hashing attributes configured
     * @param user The user DTO object passed in via request
     * @param encodingResult The result of the crypto service encoding
     * @returns An instance of the ServerSideCreateUserDTO
     */
    private createServerSideUser = (
        user: CreateUserDTO,
        encodingResult: EncodingResult,
    ): ServerSideCreateUserDTO => {
        return new ServerSideCreateUserDTO(
            user,
            encodingResult.hash,
            encodingResult.salt,
        );
    };

    /**
     * Takes username, email, and returns saved password validation info
     * @param username The username of the user
     * @param email The email of the user
     * @returns The stored hash password for the user, salt, and iterations
     */
    getSavedPasswordValidationInfo = async (
        username: string,
        email: string,
    ): Promise<EncodingResult> => {
        let user: User;
        await this.usersRepository.findOne({ where: { username, email } });
        return {
            hash: user.hash,
            iterations: user.iterations,
            salt: user.salt,
        };
    };

    /**
     * Checks if the given username exists in the database
     * @param username The username to search for
     * @returns If the username exists in the database
     */
    doesUsernameExist = async (username: string): Promise<boolean> => {
        let isExistent;
        await this.usersRepository.findOne({ where: { username } });
        return isExistent;
    };

    /**
     * Checks if the given email exists in the database
     * @param email The email to search for
     * @returns If the email exists in the database
     */
    doesEmailExist = async (email: string): Promise<boolean> => {
        let isExistent;
        await this.usersRepository.findOne({ where: { email } });
        return isExistent;
    };

    /**
     * Creates a new user given the username and password, hashing the password and salting it in the backend
     * @param request The request from the front-end to create the new user
     * @returns The created user
     */
    create = async (request: CreateUserDTO): Promise<User | undefined> => {
        const encodingResult: EncodingResult = await this.cryptoService.encode(
            request.password,
        );
        const user = this.createServerSideUser(request, encodingResult);
        const createdUser = await this.usersRepository.create(user);
        return await this.usersRepository.save(createdUser);
    };
}
