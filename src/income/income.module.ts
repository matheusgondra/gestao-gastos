import { Module } from "@nestjs/common";
import { AddIncomeController } from "./controllers/add-income.controller";
import { AddIncomeService } from "./services/add-income.service";
import { DatabaseModule } from "@/infra/database/database.module";

@Module({
	imports: [DatabaseModule],
	controllers: [AddIncomeController],
	providers: [AddIncomeService]
})
export class IncomeModule {}
