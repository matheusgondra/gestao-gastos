import { SignInController } from "@/auth/controllers/signin.controller";
import { SignInRequestDTO } from "@/auth/dto/sign-in-request.dto";
import { SignInResponseDTO } from "@/auth/dto/sign-in-response.dto";
import { SignInService } from "@/auth/services/signin.service";
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

	it("should call execute with correct params", async () => {
		const executeSpy = jest.spyOn(signinServiceStub, "execute");
		await sut.handle(signInRequestDTO);
		expect(executeSpy).toHaveBeenCalledWith(signInRequestDTO);
	});

	it("should return an access token on success", async () => {
		const httpResponse = await sut.handle(signInRequestDTO);
		expect(httpResponse).toEqual(new SignInResponseDTO(httpResponse.token));
	});
});
