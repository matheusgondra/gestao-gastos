import { SignUpController } from "@/auth/controllers/signup.controller";
import { SignUpRequestDTO, SignUpResponseDTO } from "@/auth/dto";
import { User } from "@/domain/entities";
import { SignUp } from "@/domain/use-cases";
import { ConflictException } from "@nestjs/common";
import { TestBuilder } from "@test/helpers/test.builder";

describe("SignUp Controller", () => {
	let sut: SignUpController;
	let signUpStub: SignUp;

	const signUpRequestDTO: SignUpRequestDTO = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "any_password"
	};
	const fakeUser: User = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "any_password"
	};

	beforeEach(async () => {
		const module = await TestBuilder.builder()
			.setControllers([SignUpController])
			.setProviders([
				{
					provide: "SignUp",
					useValue: {
						execute: jest.fn().mockResolvedValue(fakeUser)
					}
				}
			])
			.build();

		sut = module.get(SignUpController);
		signUpStub = module.get<SignUp>("SignUp");
	});

	it("should call execute with correct params", async () => {
		const executeSpy = jest.spyOn(signUpStub, "execute");
		await sut.handle(signUpRequestDTO);
		expect(executeSpy).toHaveBeenCalledWith(signUpRequestDTO);
	});

	it("should return 409 if execute returns null", async () => {
		jest.spyOn(signUpStub, "execute").mockResolvedValueOnce(null);
		const promise = sut.handle(signUpRequestDTO);
		await expect(promise).rejects.toThrow(new ConflictException("User already exists"));
	});

	it("should return a message on success", async () => {
		const httpResponse = await sut.handle(signUpRequestDTO);
		expect(httpResponse).toEqual(new SignUpResponseDTO("Account created successfully"));
	});
});
