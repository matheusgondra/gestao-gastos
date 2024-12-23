import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { PrismaService } from "./prisma/prisma.service";
import { IncomeRepository } from "./repositories/income.repository";

@Module({
	providers: [UserRepository, IncomeRepository, PrismaService],
	exports: [UserRepository, IncomeRepository]
})
export class DatabaseModule {}
