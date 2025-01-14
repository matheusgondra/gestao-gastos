import { AuthModule } from "@/auth/auth.module";
import { SignUpController } from "@/auth/controllers/signup.controller";
import { SignUpService } from "@/auth/services/signup.service";
import { CryptographyModule } from "@/infra/cryptography/cryptography.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { PrismaHelper } from "@test/helpers/prisma.helper";
import * as request from "supertest";

describe("Sign Up Controller (E2E)", () => {
	let app: INestApplication;

	const prismaHelper = new PrismaHelper();

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

		app = module.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				transform: true
			})
		);

		await prismaHelper.connect();
		await app.init();
	});

	beforeEach(async () => {
		await prismaHelper.getPrismaClient().user.deleteMany();
	});

	afterAll(async () => {
		await prismaHelper.disconnect();
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
