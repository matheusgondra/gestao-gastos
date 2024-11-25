import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserDto } from "@/user/dto";
import { User } from "@/user/entities/user.entity";

@Injectable()
export class UserRepository {
	constructor(private readonly database: PrismaService) {}

	async add(data: UserDto): Promise<User> {
		const userAlreadyExists = await this.database.user.findUnique({
			where: {
				email: data.email
			}
		});
		if (userAlreadyExists) {
			return null;
		}
		const user = await this.database.user.create({ data });
		return user;
	}
}
