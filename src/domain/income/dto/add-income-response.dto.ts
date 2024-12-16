import { Income } from "../entities/income.entity";

export class AddIncomeResponseDTO {
	id: string;
	value: number;
	description: string;
	date: Date;

	constructor(income: Income) {
		this.id = income.id;
		this.value = income.value;
		this.description = income.description;
		this.date = income.date;
	}
}
