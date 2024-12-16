import { Income } from "@/domain/income/entities/income.entity";
import { Injectable } from "@nestjs/common";
import { IncomeRepositoryEntity } from "../entities/income.entity";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class IncomeRepository {
	constructor(private readonly database: PrismaService) {}

	async add(income: Income, userId: string): Promise<IncomeRepositoryEntity> {
		await this.database.income.create({
			data: {
				value: income.value,
				description: income.description,
				date: income.date,
				userId
			}
		});
		return null;
	}
}
