import { User } from "@/user/entities/user.entity";
import { BCryptAdapter } from "@/infra/cryptography/bcrypt.adapter";
import { UserRepository } from "@/infra/database/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { SignUpRequestDTO } from "../dto";

@Injectable()
export class SignUpService {
	constructor(
		private readonly database: UserRepository,
		private readonly hashService: BCryptAdapter
	) {}

	async execute(data: SignUpRequestDTO): Promise<User> {
		const hashedPassword = await this.hashService.hashGenerator(data.password);
		const user = this.database.add(Object.assign({}, data, { password: hashedPassword }));
		return user;
	}
}
