/**
 * DTO for creating user
 */
export class CreateUserDTO {
    constructor(
        _username: string,
        _email: string,
        _password: string,
        _lastLogin?: Date,
    ) {
        this.username = _username;
        this.email = _email;
        this.password = _password;
        this.lastLogin = _lastLogin ?? new Date();
    }
    username: string;
    email: string;
    password: string;
    lastLogin?: Date;
}

/**
 * DTO for backend creation of user, in which salts and password hash is generated
 */
export class ServerSideCreateUserDTO extends CreateUserDTO {
    constructor(
        base: CreateUserDTO,
        _hash: string,
        _salt: string,
        _iterations: number,
    ) {
        super(base.username, base.email, base.password, base.lastLogin);
        this.hash = _hash;
        this.salt = _salt;
        this.iterations = _iterations;
    }
    hash: string;
    salt: string;
    iterations: number;
}
