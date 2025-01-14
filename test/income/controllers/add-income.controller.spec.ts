import { AuthGuard } from "@/auth/auth.guard";
import { Income } from "@/domain/entities/income.entity";
import { AddIncome } from "@/domain/use-cases/income/add-income";
import { AddIncomeController } from "@/income/controllers/add-income.controller";
import { AddIncomeRequestDTO } from "@/income/dto/add-income-request.dto";
import { AddIncomeResponseDTO } from "@/income/dto/add-income-response.dto";
import { TestBuilder } from "@test/helpers/test.builder";

describe("AddIncomeController", () => {
	let sut: AddIncomeController;
	let addIncomeStub: AddIncome;

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
		const module = await TestBuilder.builder()
			.setControllers([AddIncomeController])
			.setProviders([
				{
					provide: "AddIncome",
					useValue: {
						execute: jest.fn().mockResolvedValue(fakeIncome)
					}
				}
			])
			.overrideGuard(AuthGuard, {
				canActivate() {
					return true;
				}
			})
			.build();

		sut = module.get(AddIncomeController);
		addIncomeStub = module.get<AddIncome>("AddIncome");
	});

	it("should call AddIncomeService with correct values", async () => {
		const executeSpy = jest.spyOn(addIncomeStub, "execute");
		await sut.handle(requestDTO, fakeUserId);
		expect(executeSpy).toHaveBeenCalledWith(requestDTO, fakeUserId);
	});

	it("should throw if AddIncomeService throws", async () => {
		jest.spyOn(addIncomeStub, "execute").mockRejectedValueOnce(new Error());
		const promise = sut.handle(requestDTO, fakeUserId);
		await expect(promise).rejects.toThrow();
	});

	it("should return the income on success", async () => {
		const response = await sut.handle(requestDTO, fakeUserId);
		expect(response).toEqual(new AddIncomeResponseDTO(fakeIncome));
	});
});
