import { Income } from "@/domain/entities/income.entity";
import { IncomeRepositoryEntity } from "@/infra/database/entities/income.entity";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { IncomeRepository } from "@/infra/database/repositories/income.repository";
import { Test } from "@nestjs/testing";

describe("IncomeRepository", () => {
	let sut: IncomeRepository;
	let prismaServiceStub: PrismaService;

	const fakeIncome: Income = {
		id: undefined,
		value: 10000,
		description: "any_description",
		date: new Date("2021-01-01")
	};
	const fakeUserId = "any_user_id";
	const fakeIncomeRepositoryEntity: IncomeRepositoryEntity = {
		id: "any_id",
		value: 10000,
		description: "any_description",
		date: new Date("2021-01-01"),
		createdAt: new Date(),
		updatedAt: new Date()
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				IncomeRepository,
				{
					provide: PrismaService,
					useValue: {
						income: {
							create: jest.fn().mockResolvedValue(fakeIncomeRepositoryEntity)
						}
					}
				}
			]
		}).compile();

		sut = module.get(IncomeRepository);
		prismaServiceStub = module.get(PrismaService);
	});

	it("should call PrismaService with correct value", async () => {
		const createSpy = jest.spyOn(prismaServiceStub.income, "create");
		await sut.add(fakeIncome, fakeUserId);
		expect(createSpy).toHaveBeenCalledWith({
			data: {
				value: fakeIncome.value,
				description: fakeIncome.description,
				date: fakeIncome.date,
				userId: fakeUserId
			}
		});
	});

	it("should throw if PrismaService throws", async () => {
		jest.spyOn(prismaServiceStub.income, "create").mockRejectedValueOnce(new Error());
		const promise = sut.add(fakeIncome, fakeUserId);
		await expect(promise).rejects.toThrow(new Error());
	});

	it("should return income on success", async () => {
		const result = await sut.add(fakeIncome, fakeUserId);
		expect(result).toEqual(fakeIncomeRepositoryEntity);
	});
});
