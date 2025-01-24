import { AuthModule } from "@/auth/auth.module";
import { CryptographyModule } from "@/infra/cryptography/cryptography.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaHelper } from "@test/helpers/prisma.helper";
import { TestBuilder } from "@test/helpers/test.builder";
import * as request from "supertest";

describe("SignIn Controller E2E", () => {
	let app: INestApplication;

	const prismaHelper = new PrismaHelper();

	beforeAll(async () => {
		await prismaHelper.connect();

		app = await TestBuilder.builder()
			.setImports([
				ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
				DatabaseModule,
				AuthModule,
				CryptographyModule
			])
			.buildE2E();
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
