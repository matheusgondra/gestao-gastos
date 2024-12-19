import { AuthModule } from "@/domain/auth/auth.module";
import { SignInController } from "@/domain/auth/controllers/signin.controller";
import { SignInService } from "@/domain/auth/services/signin.service";
import { CryptographyModule } from "@/infra/cryptography/cryptography.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { PrismaHelper } from "@test/helpers/prisma.helper";
import * as request from "supertest";

describe("SignIn Controller E2E", () => {
	let app: INestApplication;

	const prismaHelper = new PrismaHelper();

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			controllers: [SignInController],
			imports: [
				ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
				DatabaseModule,
				AuthModule,
				CryptographyModule
			],
			providers: [SignInService]
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

	afterEach(async () => {
		await prismaHelper.getPrismaClient().user.deleteMany();
	});

	afterAll(async () => {
		await prismaHelper.disconnect();
		await app.close();
	});

	it("should return an access token on success", async () => {
		await request(app.getHttpServer())
			.post("/signup")
			.send({
				firstName: "John",
				lastName: "Doe",
				email: "johndoe@mail.com",
				password: "StrongP@ssword123"
			})
			.expect(201)
			.expect({ message: "Account created successfully" });

		const httpResponse = await request(app.getHttpServer()).post("/signin").send({
			email: "johndoe@mail.com",
			password: "StrongP@ssword123"
		});
		expect(201);
		expect({ httpResponse });
	});
});
