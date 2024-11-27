import { User } from "@/domain/user/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserRepository {
	constructor(private readonly database: PrismaService) {}

	async add(data: User): Promise<User> {
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
