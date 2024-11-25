import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { BCryptAdapter } from "@/adapter/bcrypt.adapter";
import { UserRepository } from "@/database/repositories/user.repository";

@Injectable()
export class UserService {
	constructor(
		private readonly database: UserRepository,
		private readonly hashService: BCryptAdapter
	) {}

	async add(data: UserDto): Promise<User> {
		const hashedPassword = await this.hashService.hashGenerator(data.password);
		const user = this.database.add(Object.assign({}, data, { password: hashedPassword }));
		return user;
	}
}
