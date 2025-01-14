import { User } from "@/domain/entities";
import { SignUp, SignUpData } from "@/domain/use-cases";
import { BCryptAdapter } from "@/infra/cryptography/bcrypt.adapter";
import { UserRepository } from "@/infra/database/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SignUpService implements SignUp {
	constructor(
		private readonly database: UserRepository,
		private readonly hashService: BCryptAdapter
	) {}

	async execute(data: SignUpData): Promise<User> {
		const hashedPassword = await this.hashService.hashGenerator(data.password);
		const user = this.database.add(Object.assign({}, data, { password: hashedPassword }));
		return user;
	}
}
