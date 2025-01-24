import { Income } from "@/domain/entities";
import { AddIncome, AddIncomeData } from "@/domain/use-cases/income/add-income";
import { IncomeRepository } from "@/infra/database/repositories/income.repository";
import { Injectable } from "@nestjs/common";
import { IncomeMapper } from "../mappers/income.mapper";

@Injectable()
export class AddIncomeService implements AddIncome {
	constructor(private readonly repository: IncomeRepository) {}

	async execute(dto: AddIncomeData, userId: string): Promise<Income> {
		const income = IncomeMapper.parse(dto);
		const incomeCreated = await this.repository.add(income, userId);
		return IncomeMapper.toDomain(incomeCreated);
	}
}
