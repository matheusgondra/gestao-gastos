import { AddAccountRepository } from "@/data/protocols";
import { AddAccountService } from "@/data/services/add-account.service";
import { Test } from "@nestjs/testing";

describe("AddAccountService", () => {
	let sut: AddAccountService;
	let addAccountRepositoryStub: AddAccountRepository;
	const fakeAccount = {
		id: "any_id",
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "any_password",
		created_at: new Date(),
		updated_at: new Date()
	};
	const fakeAccountData = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "any_password"
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				{
					provide: "AddAccountRepository",
					useValue: {
						add: jest.fn().mockResolvedValue(fakeAccount)
					}
				},
				AddAccountService
			]
		}).compile();

		sut = module.get(AddAccountService);
		addAccountRepositoryStub = module.get("AddAccountRepository");
	});

	it("should call AddAccountRepository with correct params", async () => {
		const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
		await sut.add(fakeAccountData);

		expect(addSpy).toHaveBeenCalledWith(fakeAccountData);
	});
});
