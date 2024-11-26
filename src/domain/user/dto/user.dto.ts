import { IsNotEmpty, IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class UserDto extends User {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
