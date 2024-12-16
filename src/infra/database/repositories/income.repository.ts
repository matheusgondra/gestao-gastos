import { Income } from "@/domain/income/entities/income.entity";
import { Injectable } from "@nestjs/common";
import { IncomeRepositoryEntity } from "../entities/income.entity";

@Injectable()
export class IncomeRepository {
	async add(income: Omit<Income, "id">): Promise<IncomeRepositoryEntity> {
		return null;
	}
}
