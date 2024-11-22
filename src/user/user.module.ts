import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "@/database/database.module";
import { AdapterModule } from "@/adapter/adapter.module";

@Module({
	imports: [DatabaseModule, AdapterModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
