import { Income } from "@prisma/client";
import { IncomeRepositoryEntity } from "../database/entities/income.entity";

export class IncomeRepositoryMapper {
	static toEntity(incomePrisma: Income): IncomeRepositoryEntity {
		return {
			id: incomePrisma.id,
			value: incomePrisma.value,
			description: incomePrisma.description,
			date: incomePrisma.date,
			createdAt: incomePrisma.createdAt,
			updatedAt: incomePrisma.updatedAt
		};
	}
}
