import { Income } from "@/domain/income/entities/income.entity";
import { Injectable } from "@nestjs/common";
import { IncomeRepositoryEntity } from "../entities/income.entity";

@Injectable()
export class IncomeRepository {
	async add(income: Income): Promise<IncomeRepositoryEntity> {
		return null;
	}
}
