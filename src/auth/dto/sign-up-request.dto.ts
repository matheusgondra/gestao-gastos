import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class SignUpRequestDTO {
	@ApiProperty({ description: "User first name", required: true, example: "John" })
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({ description: "User last name", required: true, example: "Doe" })
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({ description: "User email", required: true, example: "johndoe@mail.com" })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ description: "User password", required: true, example: "P@ssw0rd" })
	@IsStrongPassword()
	@IsNotEmpty()
	password: string;
}
