import { Income } from "@/domain/income/entities/income.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class IncomeRepository {
	async add(income: Omit<Income, "id">): Promise<any> {
		return null;
	}
}
