import { AddAccountRepository, AddAccountRepositoryParams, AddAccountRepositoryResult } from "@/data/protocols";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserRepository implements AddAccountRepository {
	constructor(private readonly database: PrismaService) {}

	async add(account: AddAccountRepositoryParams): Promise<AddAccountRepositoryResult> {
		const user = await this.database.user.findUnique({
			where: {
				email: account.email
			}
		});
		if (user) {
			return null;
		}

		const newUser = await this.database.user.create({
			data: account
		});

		return newUser;
	}
}
