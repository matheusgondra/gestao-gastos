import { SignUpController } from "@/application/controllers/sign-up.controller";
import { DataModule } from "@/data/data.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

describe("Sign Up Controller (E2E)", () => {
	let app: INestApplication;
	let prismaService: PrismaService;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			controllers: [SignUpController],
			imports: [DatabaseModule, DataModule]
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
