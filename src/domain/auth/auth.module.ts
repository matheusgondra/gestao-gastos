import { CryptographyModule } from "@/infra/cryptography/cryptography.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { Module } from "@nestjs/common";
import { SignUpController } from "./controllers/signup.controller";
import { SignUpService } from "./services/signup.service";

@Module({
	imports: [DatabaseModule, CryptographyModule],
	controllers: [SignUpController],
	providers: [SignUpService]
})
export class AuthModule {}
