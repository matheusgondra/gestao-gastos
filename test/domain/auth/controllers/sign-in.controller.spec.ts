import { SignInController } from "@/domain/auth/controllers/signin.controller";
import { SignInRequestDTO } from "@/domain/auth/dto/sign-in-request.dto";
import { SignInService } from "@/domain/auth/services/signin.service";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("SignIn Controller", () => {
	let sut: SignInController;
	let signinServiceStub: SignInService;

	const signInRequestDTO: SignInRequestDTO = {
		email: "any_email",
		password: "any_password"
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SignInController],
			providers: [
				{
					provide: SignInService,
					useValue: {
						execute: jest.fn().mockResolvedValue({ token: "any_access_token" })
					}
				}
			]
		}).compile();

		sut = module.get(SignInController);
		signinServiceStub = module.get(SignInService);
	});

	it("should return 404 if execute return null", async () => {
		jest.spyOn(signinServiceStub, "execute").mockResolvedValueOnce(null);
		const promise = sut.handle(signInRequestDTO);
		await expect(promise).rejects.toThrow(new NotFoundException("Email or password is wrong"));
	});
});
