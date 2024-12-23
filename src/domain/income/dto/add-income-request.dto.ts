import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class AddIncomeRequestDTO {
	@IsPositive()
	@IsNumber()
	value: number;

	@IsNotEmpty()
	description: string;

	@Type(() => Date)
	@IsDate()
	date: Date;
}
