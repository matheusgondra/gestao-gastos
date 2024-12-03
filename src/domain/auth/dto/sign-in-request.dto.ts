import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInRequestDTO {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	password: string;
}
