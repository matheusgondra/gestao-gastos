import { IncomeRepositoryEntity } from "@/infra/database/entities/income.entity";
import { Income } from "../entities/income.entity";

export class IncomeMapper {
	static toDomain(entity: IncomeRepositoryEntity): Income {
		return {
			id: entity.id,
			value: entity.value / 100,
			description: entity.description,
			date: entity.date
		};
	}

	static parse({ value, date, description }: { value: number; description: string; date: Date }): Income {
		return {
			id: undefined,
			value: value * 100,
			description,
			date
		};
	}
}
