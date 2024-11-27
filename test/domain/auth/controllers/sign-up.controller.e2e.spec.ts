import { AuthModule } from "@/domain/auth/auth.module";
import { SignUpController } from "@/domain/auth/controllers/signup.controller";
import { SignUpService } from "@/domain/auth/services/signup.service";
import { CryptographyModule } from "@/infra/cryptography/cryptography.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

describe("Sign Up Controller (E2E)", () => {
	let app: INestApplication;
	let prismaService: PrismaService;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			controllers: [SignUpController],
			imports: [
				ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
				DatabaseModule,
				AuthModule,
				CryptographyModule
			],
			providers: [SignUpService]
		}).compile();

		prismaService = module.get<PrismaService>(PrismaService);
		app = module.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true
			})
		);
		await app.init();
	});

	beforeEach(async () => {
		await prismaService.user.deleteMany();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should return 201 on success", async () => {
		return request(app.getHttpServer())
			.post("/signup")
			.send({
				firstName: "John",
				lastName: "Doe",
				email: "johndoe@mail.com",
				password: "StrongP@ssword123"
			})
			.expect(201)
			.expect({ message: "Account created successfully" });
	});
});
