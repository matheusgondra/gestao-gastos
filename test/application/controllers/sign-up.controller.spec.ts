import { SignUpController } from "@/application/controllers/sign-up.controller";
import { SignUpRequestDTO, SignUpResponseDTO } from "@/application/dto";
import { AddAccount } from "@/domain/use-cases/add-account";
import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("SignUpController", () => {
	let sut: SignUpController;
	let addAccountStub: AddAccount;
	const signUpRequestDTO: SignUpRequestDTO = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "any_password"
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SignUpController],
			providers: [
				{
					provide: "AddAccount",
					useValue: {
						add: jest.fn().mockResolvedValue({ message: "Account created successfully" })
					}
				}
			]
		}).compile();

		sut = module.get(SignUpController);
		addAccountStub = module.get("AddAccount");
	});

	it("should call AddAccount with correct params", async () => {
		const addSpy = jest.spyOn(addAccountStub, "add");
		await sut.handle(signUpRequestDTO);

		expect(addSpy).toHaveBeenCalledWith(signUpRequestDTO);
	});

	it("should return 409 if AddAccount returns null", async () => {
		jest.spyOn(addAccountStub, "add").mockResolvedValueOnce(null);
		const promise = sut.handle(signUpRequestDTO);

		await expect(promise).rejects.toThrow(new ConflictException("User already exists"));
	});

	it("should return a message on success", async () => {
		const httpResponse = await sut.handle(signUpRequestDTO);

		expect(httpResponse).toEqual(new SignUpResponseDTO("Account created successfully"));
	});
});
