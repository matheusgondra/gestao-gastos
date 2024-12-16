import { AuthGuard } from "@/domain/auth/auth.guard";
import { AddIncomeController } from "@/domain/income/controllers/add-income.controller";
import { AddIncomeRequestDTO } from "@/domain/income/dto/add-income-request.dto";
import { AddIncomeResponseDTO } from "@/domain/income/dto/add-income-response.dto";
import { Income } from "@/domain/income/entities/income.entity";
import { AddIncomeService } from "@/domain/income/services/add-income.service";
import { Test } from "@nestjs/testing";

describe("AddIncomeController", () => {
	let sut: AddIncomeController;
	let addIncomeService: AddIncomeService;

	const requestDTO: AddIncomeRequestDTO = {
		value: 100.0,
		description: "any_description",
		date: new Date("2021-01-01")
	};
	const fakeIncome: Income = {
		id: "any_id",
		value: 100,
		description: "any_description",
		date: new Date("2021-01-01")
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [AddIncomeController],
			providers: [
				{
					provide: AddIncomeService,
					useValue: {
						execute: jest.fn().mockResolvedValue(fakeIncome)
					}
				}
			]
		})
			.overrideGuard(AuthGuard)
			.useValue({
				canActivate() {
					return true;
				}
			})
			.compile();

		sut = module.get(AddIncomeController);
		addIncomeService = module.get(AddIncomeService);
	});

	it("should call AddIncomeService with correct value", async () => {
		const executeSpy = jest.spyOn(addIncomeService, "execute");
		await sut.handle(requestDTO);
		expect(executeSpy).toHaveBeenCalledWith(requestDTO);
	});

	it("should throw if AddIncomeService throws", async () => {
		jest.spyOn(addIncomeService, "execute").mockRejectedValueOnce(new Error());
		const promise = sut.handle(requestDTO);
		await expect(promise).rejects.toThrow();
	});

	it("should return the income on success", async () => {
		const response = await sut.handle(requestDTO);
		expect(response).toEqual(new AddIncomeResponseDTO(fakeIncome));
	});
});
