import { AppModule } from "@/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { PrismaHelper } from "@test/helpers/prisma.helper";
import * as request from "supertest";

describe("AddIncomeController E2E", () => {
	let app: INestApplication;
	let token: string;

	const prismaHelper = new PrismaHelper();

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = module.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

		await prismaHelper.connect();
		await app.init();

		await request(app.getHttpServer())
			.post("/signup")
			.send({
				firstName: "John",
				lastName: "Doe",
				email: "johndoe@mail.com",
				password: "Password@1234"
			})
			.expect(201);

		const response = await request(app.getHttpServer()).post("/signin").send({
			email: "johndoe@mail.com",
			password: "Password@1234"
		});

		token = response.body.token;
	});

	beforeEach(async () => {
		await prismaHelper.getPrismaClient().income.deleteMany();
	});

	afterAll(async () => {
		await prismaHelper.disconnect();
		await app.close();
	});

	it("should return 201 on success", async () => {
		await request(app.getHttpServer())
			.post("/income")
			.set("Authorization", `Bearer ${token}`)
			.send({
				value: 150.32,
				description: "Salary",
				date: "2021-09-01"
			})
			.expect(201)
			.expect((response) => {
				expect(response.body).toEqual({
					id: expect.any(String),
					value: 150.32,
					description: "Salary",
					date: "2021-09-01T00:00:00.000Z"
				});
			});
	});
});
