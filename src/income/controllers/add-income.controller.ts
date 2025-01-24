import { AddIncome } from "@/domain/use-cases/income/add-income";
import { UserId } from "@/user/decorators/user-id.decorator";
import { BadRequestException, Body, Controller, Inject, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger";
import { AddIncomeRequestDTO } from "../dto/add-income-request.dto";
import { AddIncomeResponseDTO } from "../dto/add-income-response.dto";

@ApiBearerAuth()
@ApiTags("Income")
@Controller("income")
export class AddIncomeController {
	constructor(
		@Inject("AddIncome")
		private readonly service: AddIncome
	) {}

	@ApiOperation({ summary: "Add new income" })
	@ApiCreatedResponse({ description: "Income created", type: AddIncomeResponseDTO })
	@ApiBadRequestResponse({
		description: "Invalid request",
		type: BadRequestException,
		example: {
			message: "Invalid token",
			error: "Unauthorized",
			statusCode: 401
		}
	})
	@ApiInternalServerErrorResponse({
		description: "Internal server error",
		example: {
			message: "Internal server error",
			error: "Internal Server Error",
			statusCode: 500
		}
	})
	@Post()
	async handle(@Body() request: AddIncomeRequestDTO, @UserId() userId: string): Promise<AddIncomeResponseDTO> {
		const income = await this.service.execute({ ...request, date: new Date(request.date) }, userId);
		return new AddIncomeResponseDTO(income);
	}
}
