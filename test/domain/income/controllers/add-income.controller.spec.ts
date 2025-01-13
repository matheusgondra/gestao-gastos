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
	const fakeUserId = "any_user_id";
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

	it("should call AddIncomeService with correct values", async () => {
		const executeSpy = jest.spyOn(addIncomeService, "execute");
		await sut.handle(requestDTO, fakeUserId);
		expect(executeSpy).toHaveBeenCalledWith(requestDTO, fakeUserId);
	});

	it("should throw if AddIncomeService throws", async () => {
		jest.spyOn(addIncomeService, "execute").mockRejectedValueOnce(new Error());
		const promise = sut.handle(requestDTO, fakeUserId);
		await expect(promise).rejects.toThrow();
	});

	it("should return the income on success", async () => {
		const response = await sut.handle(requestDTO, fakeUserId);
		expect(response).toEqual(new AddIncomeResponseDTO(fakeIncome));
	});
});
