import { IncomeRepository } from "@/infra/database/repositories/income.repository";
import { Injectable } from "@nestjs/common";
import { AddIncomeRequestDTO } from "../dto/add-income-request.dto";
import { Income } from "../entities/income.entity";
import { IncomeMapper } from "../mappers/income.mapper";

@Injectable()
export class AddIncomeService {
	constructor(private readonly repository: IncomeRepository) {}

	async execute(dto: AddIncomeRequestDTO, userId: string): Promise<Income> {
		const income = IncomeMapper.parse(dto);
		const incomeCreated = await this.repository.add(income, userId);
		return IncomeMapper.toDomain(incomeCreated);
	}
}
