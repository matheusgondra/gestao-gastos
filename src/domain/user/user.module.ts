import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { DatabaseModule } from "@/infra/database/database.module";
import { CryptographyModule } from "@/infra/cryptography/cryptography.module";

@Module({
	imports: [DatabaseModule, CryptographyModule],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
