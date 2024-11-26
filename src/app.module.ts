import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./domain/user/user.controller";
import { UserService } from "./domain/user/user.service";
import { UserModule } from "./domain/user/user.module";
import { DatabaseModule } from "./infra/database/database.module";
import { CryptographyModule } from "./infra/cryptography/cryptography.module";
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
		UserModule,
		DatabaseModule,
		CryptographyModule
	],
	controllers: [UserController],
	providers: [UserService]
})
export class AppModule {}
