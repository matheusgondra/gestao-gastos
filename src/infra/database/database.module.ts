import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "./repositories/user.repository";

@Module({
	providers: [
		PrismaService,
		{
			provide: "AddAccountRepository",
			useClass: UserRepository
		}
	],
	exports: ["AddAccountRepository"]
})
export class DatabaseModule {}
