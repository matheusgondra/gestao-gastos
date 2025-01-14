import { CryptographyModule } from "@/infra/cryptography/cryptography.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { SignInController } from "./controllers/signin.controller";
import { SignUpController } from "./controllers/signup.controller";
import { SignInService } from "./services/signin.service";
import { SignUpService } from "./services/signup.service";

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: "6000s" }
		}),
		DatabaseModule,
		CryptographyModule
	],
	controllers: [SignUpController, SignInController],
	providers: [
		{
			provide: "SignUp",
			useClass: SignUpService
		},
		SignInService
	]
})
export class AuthModule {}
