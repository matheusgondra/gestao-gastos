import { AddIncomeRequestDTO } from "@/domain/income/dto/add-income-request.dto";
import { AddIncomeService } from "@/domain/income/services/add-income.service";
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

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AddIncomeService,
				{
					provide: IncomeRepository,
					useValue: {
						add: jest.fn()
					}
				}
			]
		}).compile();

		sut = module.get(AddIncomeService);
		repository = module.get(IncomeRepository);
	});

	it("should call IncomeRepository with correct value", async () => {
		const addSpy = jest.spyOn(repository, "add");
		await sut.execute(requestDTO);
		expect(addSpy).toHaveBeenCalledWith({ ...requestDTO, value: requestDTO.value * 100 });
	});
});
