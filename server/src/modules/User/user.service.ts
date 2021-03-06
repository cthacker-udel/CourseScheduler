import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import {
    type CreateUserDTO,
    ServerSideCreateUserDTO,
} from "src/dto/user/create.user.dto";
import { User } from "src/entities";
import { CryptoService, type EncodingResult } from "../Crypto/crypto.service";
import { ResetTokenQuery, ResetTokenType } from "src/@types";
import { ResetToken } from "src/entities/SubEntities";

/**
 * The users service, handling all operations involving the users collection
 */
@Injectable()
export class UserService {
    /**
     * DI injected logger
     */
    private readonly logger = new Logger(UserService.name);
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
            encodingResult.iterations,
        );
    };

    /**
     * Adds a reset token to the user when requested
     *
     * @param query The query to find the select user from the database
     * @param token The token to add to the user entity
     * @param validUntil When the token expires
     */
    addResetToken = async (
        query: ResetTokenQuery,
        token: string,
        tokenType: ResetTokenType,
        validUntil: Date,
    ): Promise<void> => {
        const { email, username } = query;
        const updateToken = await this.getResetToken(username, email);
        updateToken[tokenType] = {
            token,
            validUntil: validUntil.toUTCString(),
        };
        await this.usersRepository.update(
            { ...query },
            {
                resetToken: { ...updateToken },
            },
        );
        this.logger.log(
            `Added reset token to ${
                query.email ? `Email [${query.email}]` : ""
            }, ${query.username ? `Username [${query.username}]` : ""}`,
        );
    };

    /**
     * Fetches the reset token from the given user if passed in proper credentials
     *
     * @param username - The username of the user to fetch
     * @param email - The email of the user to fetch
     * @returns The reset token of the user
     */
    getResetToken = async (
        username?: string,
        email?: string,
    ): Promise<ResetToken> => {
        const user: User = await this.usersRepository.findOne({
            where: { ...(username && { username }), ...(email && { email }) },
        });
        return user.resetToken;
    };

    /**
     * Takes username, email, and returns saved password validation info
     * @param username The username of the user
     * @param email The email of the user
     * @returns The stored hash password for the user, salt, and iterations
     */
    getSavedPasswordValidationInfo = async (
        username?: string,
        email?: string,
    ): Promise<EncodingResult> => {
        const user: User = await this.usersRepository.findOne({
            where: { ...(username && { username }), ...(email && { email }) },
        });
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
        const existentUser = await this.usersRepository.findOne({
            where: { username },
        });
        this.logger.log(
            `Username ${username} ${
                existentUser !== null ? "exists" : "does not exist"
            }`,
        );
        return existentUser !== null;
    };

    /**
     * Checks if the given email exists in the database
     * @param email The email to search for
     * @returns If the email exists in the database
     */
    doesEmailExist = async (email: string): Promise<boolean> => {
        const existentEmail = await this.usersRepository.findOne({
            where: { email },
        });
        this.logger.log(
            `Email ${email} ${
                existentEmail !== null ? "exists" : "does not exist"
            }`,
        );
        return existentEmail !== null;
    };

    findUserByEmail = async (email: string): Promise<User | undefined> => {
        const user = await this.usersRepository.findOneBy({ email });
        this.logger.log(
            `Found user with email ${email} : ${user !== undefined}`,
        );
        return user;
    };

    findUserByUsername = async (
        username: string,
    ): Promise<User | undefined> => {
        const user = await this.usersRepository.findOneBy({ username });
        this.logger.log(
            `Found user with username ${username} : ${user !== undefined}`,
        );
        return user;
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
        const createdUser = this.usersRepository.create(user);
        this.logger.log(`Created user ${createdUser.username}`);
        return await this.usersRepository.save(createdUser);
    };
}
