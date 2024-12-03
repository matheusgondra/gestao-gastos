import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./domain/auth/auth.module";
import { CryptographyModule } from "./infra/cryptography/cryptography.module";
import { DatabaseModule } from "./infra/database/database.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./domain/auth/auth.guard";
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
		DatabaseModule,
		CryptographyModule,
		AuthModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	]
})
export class AppModule {}
