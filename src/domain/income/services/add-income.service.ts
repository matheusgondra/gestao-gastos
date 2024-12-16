import { Injectable } from "@nestjs/common";
import { AddIncomeRequestDTO } from "../dto/add-income-request.dto";
import { Income } from "../entities/income.entity";
import { IncomeRepository } from "@/infra/database/repositories/income.repository";

@Injectable()
export class AddIncomeService {
	constructor(private readonly repository: IncomeRepository) {}

	async execute(dto: AddIncomeRequestDTO): Promise<Income> {
		await this.repository.add({ ...dto, value: dto.value * 100 });
		return null;
	}
}
