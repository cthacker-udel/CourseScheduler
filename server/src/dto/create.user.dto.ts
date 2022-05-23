/**
 * DTO for creating user
 */
export class CreateUserDTO {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    lastLogin: Date;
}
