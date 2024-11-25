import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { DatabaseModule } from "@/database/database.module";
import { AdapterModule } from "@/adapter/adapter.module";

@Module({
	imports: [DatabaseModule, AdapterModule],
	providers: [UserService]
})
export class UserModule {}
