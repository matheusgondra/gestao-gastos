import { ApiProperty } from "@nestjs/swagger";
import { Income } from "../entities/income.entity";

export class AddIncomeResponseDTO {
	@ApiProperty({ description: "Income ID", example: "ddf2d0c3-a844-4235-a3ba-cf50516ef824" })
	id: string;

	@ApiProperty({ description: "Income value", example: 1000.43 })
	value: number;

	@ApiProperty({ description: "Income description", example: "Salary" })
	description: string;

	@ApiProperty({ description: "Income date", example: "2021-09-10T10:47:21.000Z" })
	date: Date;

	constructor(income: Income) {
		this.id = income.id;
		this.value = income.value;
		this.description = income.description;
		this.date = income.date;
	}
}
