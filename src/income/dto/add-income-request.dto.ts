import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class AddIncomeRequestDTO {
	@ApiProperty({
		required: true,
		description: "Income value",
		example: 1550.75
	})
	@IsPositive()
	@IsNumber()
	value: number;

	@ApiProperty({
		required: true,
		description: "Income description",
		example: "Salary"
	})
	@IsNotEmpty()
	description: string;

	@ApiProperty({
		required: true,
		type: Date,
		description: "Income date",
		example: "2021-09-10T10:47:21.000Z"
	})
	@Type(() => Date)
	@IsDate()
	date: Date;
}
