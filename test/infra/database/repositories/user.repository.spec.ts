import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { UserRepository } from "@/infra/database/repositories/user.repository";
import { Test } from "@nestjs/testing";

describe("UserRepository", () => {
	let sut: UserRepository;
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
		createdAt: "any_date",
		updatedAt: "any_date"
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				UserRepository,
				{
					provide: PrismaService,
					useValue: {
						user: {
							findUnique: jest.fn().mockReturnValue(fakeUser)
						}
					}
				}
			]
		}).compile();

		sut = module.get(UserRepository);
	});

	it("should return null if user already exists", async () => {
		const result = await sut.add(fakeAccountData);

		expect(result).toBeNull();
	});
});
