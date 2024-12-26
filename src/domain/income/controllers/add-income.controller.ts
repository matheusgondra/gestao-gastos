import { UserId } from "@/domain/user/decorators/user-id.decorator";
import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AddIncomeRequestDTO } from "../dto/add-income-request.dto";
import { AddIncomeResponseDTO } from "../dto/add-income-response.dto";
import { AddIncomeService } from "../services/add-income.service";

@ApiBearerAuth()
@ApiTags("Income")
@Controller("income")
export class AddIncomeController {
	constructor(private readonly service: AddIncomeService) {}

	@ApiOperation({ summary: "Add new income" })
	@ApiCreatedResponse({
		description: "Income created",
		type: AddIncomeResponseDTO,
		example: {
			id: "ddf2d0c3-a844-4235-a3ba-cf50516ef824",
			value: 1550.75,
			description: "Salary",
			date: "2021-09-10T10:47:21.000Z"
		}
	})
	@ApiBadRequestResponse({
		description: "Invalid request",
		type: BadRequestException,
		example: {
			message: "Invalid token",
			error: "Unauthorized",
			statusCode: 401
		}
	})
	@Post()
	async handle(@Body() request: AddIncomeRequestDTO, @UserId() userId: string): Promise<AddIncomeResponseDTO> {
		const income = await this.service.execute({ ...request, date: new Date(request.date) }, userId);
		return new AddIncomeResponseDTO(income);
	}
}
