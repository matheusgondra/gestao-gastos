import { AddAccountRepository, HashGenerator } from "@/data/protocols";
import { AddAccountService } from "@/data/services/add-account.service";
import { Test } from "@nestjs/testing";

describe("AddAccountService", () => {
	let sut: AddAccountService;
	let addAccountRepositoryStub: AddAccountRepository;
	let hashGeneratorStub: HashGenerator;
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
		password: "hashed_password"
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AddAccountService,
				{
					provide: "AddAccountRepository",
					useValue: {
						add: jest.fn().mockResolvedValue(fakeAccount)
					}
				},
				{
					provide: "HashGenerator",
					useValue: {
						hash: jest.fn().mockResolvedValue("hashed_password")
					}
				}
			]
		}).compile();

		sut = module.get(AddAccountService);
		addAccountRepositoryStub = module.get("AddAccountRepository");
		hashGeneratorStub = module.get("HashGenerator");
	});

	it("should call AddAccountRepository with correct params", async () => {
		const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
		await sut.add(fakeAccountData);

		expect(addSpy).toHaveBeenCalledWith(fakeAccountData);
	});

	it("should throw if AddAccountRepository throws", async () => {
		jest.spyOn(addAccountRepositoryStub, "add").mockRejectedValueOnce(new Error());
		const promise = sut.add(fakeAccountData);

		await expect(promise).rejects.toThrow();
	});

	it("should return null if AddAccountRepository returns null", async () => {
		jest.spyOn(addAccountRepositoryStub, "add").mockResolvedValueOnce(null);
		const account = await sut.add(fakeAccountData);

		expect(account).toBeNull();
	});

	it("should call HashGenerator with correct password", async () => {
		const hashSpy = jest.spyOn(hashGeneratorStub, "hash");
		await sut.add(fakeAccountData);

		expect(hashSpy).toHaveBeenCalledWith(fakeAccountData.password);
	});

	it("should throw if HashGenerator throws", async () => {
		jest.spyOn(hashGeneratorStub, "hash").mockRejectedValueOnce(new Error());
		const promise = sut.add(fakeAccountData);

		await expect(promise).rejects.toThrow();
	});

	it("should return a message on success", async () => {
		const response = await sut.add(fakeAccountData);

		expect(response).toEqual({ message: "Account created successfully" });
	});
});
