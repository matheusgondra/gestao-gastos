import { Income } from "@/domain/entities";

export interface AddIncomeData {
	value: number;
	description: string;
	date: Date;
}

export interface AddIncome {
	execute(data: AddIncomeData, userId: string): Promise<Income>;
}
