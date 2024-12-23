import { Body, Controller, Post } from "@nestjs/common";
import { AddIncomeRequestDTO } from "../dto/add-income-request.dto";
import { AddIncomeService } from "../services/add-income.service";
import { AddIncomeResponseDTO } from "../dto/add-income-response.dto";
import { UserId } from "@/domain/user/decorators/user-id.decorator";

@Controller("income")
export class AddIncomeController {
	constructor(private readonly service: AddIncomeService) {}

	@Post()
	async handle(@Body() request: AddIncomeRequestDTO, @UserId() userId: string): Promise<AddIncomeResponseDTO> {
		const income = await this.service.execute({ ...request, date: new Date(request.date) }, userId);
		return new AddIncomeResponseDTO(income);
	}
}
