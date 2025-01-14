import { DatabaseModule } from "@/infra/database/database.module";
import { Module } from "@nestjs/common";
import { AddIncomeController } from "./controllers/add-income.controller";
import { AddIncomeService } from "./services/add-income.service";

@Module({
	imports: [DatabaseModule],
	controllers: [AddIncomeController],
	providers: [
		{
			provide: "AddIncome",
			useClass: AddIncomeService
		}
	]
})
export class IncomeModule {}
