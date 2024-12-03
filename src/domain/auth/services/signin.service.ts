import { BCryptAdapter } from "@/infra/cryptography/bcrypt.adapter";
import { UserRepository } from "@/infra/database/repositories/user.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInRequestDTO } from "../dto";

@Injectable()
export class SignInService {
	constructor(
		private readonly database: UserRepository,
		private readonly hashService: BCryptAdapter,
		private readonly tokenService: JwtService
	) {}

	async execute(data: SignInRequestDTO): Promise<string> {
		const user = await this.database.loadUserByEmail(data.email);
		if (!user) {
			throw new NotFoundException("Email or password are not found!");
		}

		const isValid = await this.hashService.hashCompare(data.password, user.password);
		if (!isValid) {
			throw new NotFoundException("Email or password are not found!");
		}

		const accessToken = await this.tokenService.signAsync({ userId: user.id });
		return accessToken;
	}
}
