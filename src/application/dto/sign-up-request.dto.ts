import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpRequestDTO {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsStrongPassword()
	@IsNotEmpty()
	password: string;
}
