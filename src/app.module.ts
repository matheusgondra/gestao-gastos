import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./domain/auth/auth.module";
import { CryptographyModule } from "./infra/cryptography/cryptography.module";
import { DatabaseModule } from "./infra/database/database.module";
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
		DatabaseModule,
		CryptographyModule,
		AuthModule
	]
})
export class AppModule {}
