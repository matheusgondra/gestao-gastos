import { Controller } from "@nestjs/common";
import { AddIncomeRequestDTO } from "../dto/add-income-request.dto";
import { AddIncomeService } from "../services/add-income.service";
import { AddIncomeResponseDTO } from "../dto/add-income-response.dto";

@Controller("income")
export class AddIncomeController {
	constructor(private readonly service: AddIncomeService) {}

	async handle(request: AddIncomeRequestDTO): Promise<AddIncomeResponseDTO> {
		const income = await this.service.execute(request);
		return new AddIncomeResponseDTO(income);
	}
}
