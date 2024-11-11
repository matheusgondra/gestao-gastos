import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { UserRepository } from "@/infra/database/repositories/user.repository";
import { Test } from "@nestjs/testing";

describe("UserRepository", () => {
	let sut: UserRepository;
	let prismaServiceStub: PrismaService;
	const fakeAccountData = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "hashed_password"
	};
	const fakeUser = {
		id: "any_id",
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "hashed_password",
		createdAt: new Date(),
		updatedAt: new Date()
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				UserRepository,
				{
					provide: PrismaService,
					useValue: {
						user: {
							findUnique: jest.fn().mockReturnValue(null),
							create: jest.fn().mockReturnValue(fakeUser)
						}
					}
				}
			]
		}).compile();

		sut = module.get(UserRepository);
		prismaServiceStub = module.get(PrismaService);
	});

	it("should return null if user already exists", async () => {
		jest.spyOn(prismaServiceStub.user, "findUnique").mockResolvedValueOnce(fakeUser);
		const result = await sut.add(fakeAccountData);

		expect(result).toBeNull();
	});

	it("should return an user on success", async () => {
		const result = await sut.add(fakeAccountData);

		expect(result).toEqual(fakeUser);
	});
});
