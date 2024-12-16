import { Controller } from "@nestjs/common";
import { AddIncomeRequestDTO } from "../dto/add-income-request.dto";
import { AddIncomeService } from "../services/add-income.service";

@Controller("income")
export class AddIncomeController {
	constructor(private readonly service: AddIncomeService) {}

	async handle(request: AddIncomeRequestDTO) {
		await this.service.execute(request);
	}
}
