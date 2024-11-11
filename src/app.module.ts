import { Module } from "@nestjs/common";
import { SignUpController } from "./application/controllers/sign-up.controller";
import { DataModule } from "./data/data.module";
import { DatabaseModule } from "./infra/database/database.module";

@Module({
	imports: [DatabaseModule, DataModule],
	controllers: [SignUpController],
	providers: []
})
export class AppModule {}
