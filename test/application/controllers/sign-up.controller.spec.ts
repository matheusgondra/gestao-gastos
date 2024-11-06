import { Test, TestingModule } from "@nestjs/testing";
import { SignUpController } from "../../../src/application/controllers/sign-up.controller";
import { SignUpRequestDTO } from "../../../src/application/dto/sign-up-request.dto";
import { AddAccount } from "../../../src/domain/use-cases/add-account";

describe("SignUpController", () => {
	let sut: SignUpController;
	let addAccountStub: jest.Mocked<AddAccount>;
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
});
