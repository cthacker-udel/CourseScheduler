/**
 * DTO for creating user
 */
export class CreateUserDTO {
    constructor(
        _username: string,
        _email: string,
        _password: string,
        _lastLogin: Date,
    ) {
        this.username = _username;
        this.email = _email;
        this.password = _password;
        this.lastLogin = _lastLogin;
    }
    username: string;
    email: string;
    password: string;
    lastLogin: Date;
}

/**
 * DTO for backend creation of user, in which salts and password hash is generated
 */
export class ServerSideCreateUserDTO extends CreateUserDTO {
    constructor(base: CreateUserDTO, _hash: string, _salt: string) {
        super(base.username, base.email, base.password, base.lastLogin);
        this.passwordHash = _hash;
        this.passwordSalt = _salt;
    }
    passwordHash: string;
    passwordSalt: string;
}
