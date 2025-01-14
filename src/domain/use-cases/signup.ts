import { User } from "../entities/user.entity";

export interface SignUpData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface SignUp {
	execute(data: SignUpData): Promise<User>;
}
