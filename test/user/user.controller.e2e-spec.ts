import { AdapterModule } from "@/adapter/adapter.module";
import { DatabaseModule } from "@/database/database.module";
import { PrismaService } from "@/database/prisma/prisma.service";
import { UserController } from "@/user/user.controller";
import { UserModule } from "@/user/user.module";
import { UserService } from "@/user/user.service";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

describe("User Controller (E2E)", () => {
	let app: INestApplication;
	let prismaService: PrismaService;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			controllers: [UserController],
			imports: [
				ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
				DatabaseModule,
				UserModule,
				AdapterModule
			],
			providers: [UserService]
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
			.post("/user/signup")
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
