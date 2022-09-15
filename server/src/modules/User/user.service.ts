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
import { ResetToken } from "src/entities/Common";
import { validateUpdateResult } from "src/helpers/validateUpdateResult";

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
     * Adds a session token to the user, logs if any errors occur or the session token is not added
     *
     * @param sessionToken - The session token to add to the user
     * @param username - The username upon which the session token is being added
     */
    addSessionToken = async (
        sessionToken: string,
        username: string,
    ): Promise<boolean> => {
        try {
            const result = await this.usersRepository.update(
                { username },
                { sessionToken },
            );
            const { updated } = validateUpdateResult(result);
            if (updated) {
                this.logger.log("Added session token to user");
            } else {
                this.logger.log("Failed updating user with session token");
            }
            return updated;
        } catch (error: unknown) {
            this.logger.error(
                "Failed adding session token",
                (error as Error).stack,
            );
        }
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
    doesUsernameExist = async (
        username: string,
        debug?: boolean,
    ): Promise<boolean> => {
        const existentUser = await this.usersRepository.findOne({
            where: { username },
        });
        if (debug) {
            this.logger.log(
                `Username ${username} ${
                    existentUser !== null ? "exists" : "does not exist"
                }`,
            );
        }
        return existentUser !== null;
    };

    /**
     * Checks if the given email exists in the database
     * @param email The email to search for
     * @returns If the email exists in the database
     */
    doesEmailExist = async (
        email: string,
        debug?: boolean,
    ): Promise<boolean> => {
        const existentEmail = await this.usersRepository.findOne({
            where: { email },
        });
        if (debug) {
            this.logger.log(
                `Email ${email} ${
                    existentEmail !== null ? "exists" : "does not exist"
                }`,
            );
        }
        return existentEmail !== null;
    };

    /**
     * Verifies and pulls a user from the database if they exist with the supplied email, otherwise returns undefined
     *
     * @param email - The email to search for
     * @returns The user if an user exists with the email supplied, otherwise undefined.
     */
    findUserByEmail = async (email: string): Promise<User | undefined> => {
        const user = await this.usersRepository.findOneBy({ email });
        this.logger.log(
            `Found user with email ${email} : ${user !== undefined}`,
        );
        return user;
    };

    /**
     * Verifies and pulls a user from the database if they exist with the supplied username, otherwise returns undefined
     *
     * @param username - The username to search for
     * @returns The user if an user exists with the username supplied, otherwise undefined.
     */
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
     * Updates a user's username
     *
     * @param email The email used to find the user
     * @param username The new username to set the user as
     * @returns Whether the user entity was updated or not
     */
    updateUsername = async (
        email: string,
        username: string,
    ): Promise<boolean> => {
        try {
            const user = await this.usersRepository.findOneBy({ email });
            const result = await this.usersRepository.update(
                { email },
                { ...user, username },
            );
            return result.affected > 0;
        } catch (error: unknown) {
            this.logger.error(error, (error as Error).stack);
            return false;
        }
    };

    /**
     * Updates a user's email
     *
     * @param username The username used to find the user
     * @param email The new email to set the user as
     * @returns Whether the user entity was updated or not
     */
    updateEmail = async (username: string, email: string): Promise<boolean> => {
        try {
            const user = await this.usersRepository.findOneBy({ username });
            const result = await this.usersRepository.update(
                { username },
                { ...user, email },
            );
            return result.affected > 0;
        } catch (error: unknown) {
            this.logger.error(error, (error as Error).stack);
            return false;
        }
    };

    /**
     * Update's the user's last login specifically to the user whom's username matches that which was passed in
     *
     * @param username - The username to query for the user with in the collection
     * @returns Whether we updated the user's last login or not
     */
    updateLastLogin = async (username: string): Promise<boolean> => {
        try {
            const result = await this.usersRepository.update(
                { username },
                { lastLogin: new Date(Date.now()).toUTCString() },
            );
            const { updated } = validateUpdateResult(result);
            if (updated) {
                this.logger.log("Updated last login of user");
            } else {
                this.logger.log("Failed to update last login of user");
            }
            return updated;
        } catch (error: unknown) {
            this.logger.error(
                "Failed updating last login",
                (error as Error).stack,
            );
        }
    };

    /**
     * Updates a user's password
     *
     * @param username The username used to find the user
     * @param password The new password to set the user as
     * @returns Whether the user entity was updated or not
     */
    updatePassword = async (
        username: string,
        password: string,
    ): Promise<boolean> => {
        try {
            const user = await this.usersRepository.findOneBy({ username });
            const encodingResult = await this.cryptoService.encode(password);
            const { hash, iterations, salt } = encodingResult;
            const result = await this.usersRepository.update(
                { username },
                { ...user, hash, iterations, salt },
            );
            return result.affected > 0;
        } catch (error: unknown) {
            this.logger.error(error, (error as Error).stack);
            return false;
        }
    };

    /**
     * Removes a user's username token
     *
     * @param email The email used to find the user instance
     * @returns Whether the token was removed or not
     */
    removeUsernameToken = async (email: string): Promise<boolean> => {
        try {
            const user = await this.usersRepository.findOneBy({ email });
            const result = await this.usersRepository.update(
                { email },
                {
                    ...user,
                    resetToken: { ...user.resetToken, username: {} },
                },
            );
            return result.affected > 0;
        } catch (error: unknown) {
            this.logger.error(error, (error as Error).stack);
            return false;
        }
    };

    /**
     * Removes a user's email token
     *
     * @param username The username used to find the user instance
     * @returns Whether the token was removed or not
     */
    removeEmailToken = async (username: string): Promise<boolean> => {
        try {
            const user = await this.usersRepository.findOneBy({ username });
            const result = await this.usersRepository.update(
                { username },
                { ...user, resetToken: { ...user.resetToken, email: {} } },
            );
            return result.affected > 0;
        } catch (error: unknown) {
            this.logger.error(error, (error as Error).stack);
            return false;
        }
    };

    /**
     * Removes a user's password token
     *
     * @param username The username used to find the user instance
     * @returns Whether the token was removed or not
     */
    removePasswordToken = async (username: string): Promise<boolean> => {
        try {
            const user = await this.usersRepository.findOneBy({ username });
            const result = await this.usersRepository.update(
                { username },
                { ...user, resetToken: { ...user.resetToken, password: {} } },
            );
            return result.affected > 0;
        } catch (error: unknown) {
            this.logger.error(error, (error as Error).stack);
            return false;
        }
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
