import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInRequestDTO {
	@ApiProperty({ description: "User email", example: "johndoe@mail.com", required: true })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: "User password", example: "P@ssw0rd", required: true })
	@IsNotEmpty()
	password: string;
}
