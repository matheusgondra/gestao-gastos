import { Module } from "@nestjs/common";
import { AddAccountService } from "./services/add-account.service";
import { BCryptAdapter } from "@/infra/cryptography/bcrypt.adapter";
import { DatabaseModule } from "@/infra/database/database.module";

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: "AddAccount",
			useClass: AddAccountService
		},
		{
			provide: "HashGenerator",
			useClass: BCryptAdapter
		}
	],
	exports: ["AddAccount", "HashGenerator"]
})
export class DataModule {}
