import { SignUpController } from "@/domain/auth/controllers/signup.controller";
import { SignUpRequestDTO, SignUpResponseDTO } from "@/domain/auth/dto";
import { SignUpService } from "@/domain/auth/services/signup.service";
import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("SignUp Controller", () => {
	let sut: SignUpController;
	let signupServiceStub: SignUpService;

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
					provide: SignUpService,
					useValue: {
						execute: jest.fn().mockResolvedValue({ message: "Account created successfully" })
					}
				}
			]
		}).compile();

		sut = module.get(SignUpController);
		signupServiceStub = module.get(SignUpService);
	});

	it("should call execute with correct params", async () => {
		const executeSpy = jest.spyOn(signupServiceStub, "execute");
		await sut.handle(signUpRequestDTO);
		expect(executeSpy).toHaveBeenCalledWith(signUpRequestDTO);
	});

	it("should return 409 if execute returns null", async () => {
		jest.spyOn(signupServiceStub, "execute").mockResolvedValueOnce(null);
		const promise = sut.handle(signUpRequestDTO);
		await expect(promise).rejects.toThrow(new ConflictException("User already exists"));
	});

	it("should return a message on success", async () => {
		const httpResponse = await sut.handle(signUpRequestDTO);
		expect(httpResponse).toEqual(new SignUpResponseDTO("Account created successfully"));
	});
});
