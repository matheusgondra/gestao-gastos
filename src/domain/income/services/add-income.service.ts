import { Injectable } from "@nestjs/common";
import { AddIncomeRequestDTO } from "../dto/add-income-request.dto";
import { Income } from "../entities/income.entity";

@Injectable()
export class AddIncomeService {
	async execute(dto: AddIncomeRequestDTO): Promise<Income> {
		return null;
	}
}
