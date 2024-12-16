import { IsDate, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class AddIncomeRequestDTO {
	@IsPositive()
	@IsNumber()
	value: number;

	@IsNotEmpty()
	description: string;

	@IsDate()
	date: Date;
}
