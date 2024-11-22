import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { UserController } from "./user/user.controller";
import { AdapterModule } from "./adapter/adapter.module";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }), DatabaseModule, UserModule, AdapterModule],
	controllers: [UserController],
	providers: []
})
export class AppModule {}
