import { PrismaService } from "@/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { BCryptAdapter } from "@/adapter/bcrypt.adapter";

@Injectable()
export class UserService {
	constructor(
		private readonly database: PrismaService,
		private readonly hashService: BCryptAdapter
	) {}

	async add(data: UserDto): Promise<User> {
		const userAlreadyExists = await this.database.user.findUnique({
			where: {
				email: data.email
			}
		});
		if (userAlreadyExists) {
			return null;
		}
		const hashedPassword = await this.hashService.hashGenerator(data.password);
		const user = this.database.user.create({
			data: { ...data, password: hashedPassword }
		});
		return user;
	}
}
