import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { PrismaService } from "./prisma/prisma.service";

@Module({
	providers: [UserRepository, PrismaService],
	exports: [UserRepository]
})
export class DatabaseModule {}
