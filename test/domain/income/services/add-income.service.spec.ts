import { AddIncomeRequestDTO } from "@/domain/income/dto/add-income-request.dto";
import { Income } from "@/domain/income/entities/income.entity";
import { AddIncomeService } from "@/domain/income/services/add-income.service";
import { IncomeRepositoryEntity } from "@/infra/database/entities/income.entity";
import { IncomeRepository } from "@/infra/database/repositories/income.repository";
import { Test } from "@nestjs/testing";

describe("AddIncomeService", () => {
	let sut: AddIncomeService;
	let repository: IncomeRepository;

	const requestDTO: AddIncomeRequestDTO = {
		value: 100.0,
		description: "any_description",
		date: new Date("2021-01-01")
	};
	const fakeIncome: IncomeRepositoryEntity = {
		id: "any_id",
		value: 10000,
		description: "any_description",
		date: new Date("2021-01-01"),
		createdAt: new Date(),
		updatedAt: new Date()
	};
	const fakeUserId = "any_user_id";
	const fakeIncomeDomain: Income = {
		id: "any_id",
		value: 100.0,
		description: "any_description",
		date: new Date("2021-01-01")
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AddIncomeService,
				{
					provide: IncomeRepository,
					useValue: {
						add: jest.fn().mockResolvedValue(fakeIncome)
					}
				}
			]
		}).compile();

		sut = module.get(AddIncomeService);
		repository = module.get(IncomeRepository);
	});

	it("should call IncomeRepository with correct values", async () => {
		const addSpy = jest.spyOn(repository, "add");
		await sut.execute(requestDTO, fakeUserId);
		expect(addSpy).toHaveBeenCalledWith({ ...requestDTO, value: requestDTO.value * 100 }, fakeUserId);
	});

	it("should throw if IncomeRepository throws", async () => {
		jest.spyOn(repository, "add").mockRejectedValueOnce(new Error());
		const promise = sut.execute(requestDTO, fakeUserId);
		await expect(promise).rejects.toThrow();
	});

	it("should return the income on success", async () => {
		const response = await sut.execute(requestDTO, fakeUserId);
		expect(response).toEqual(fakeIncomeDomain);
	});
});
