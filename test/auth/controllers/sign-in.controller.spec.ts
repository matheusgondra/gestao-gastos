import { SignInController } from "@/auth/controllers/signin.controller";
import { SignInRequestDTO } from "@/auth/dto/sign-in-request.dto";
import { SignInResponseDTO } from "@/auth/dto/sign-in-response.dto";
import { SignIn } from "@/domain/use-cases";
import { TestBuilder } from "@test/helpers/test.builder";

describe("SignIn Controller", () => {
	let sut: SignInController;
	let signInStub: SignIn;

	const signInRequestDTO: SignInRequestDTO = {
		email: "any_email",
		password: "any_password"
	};

	beforeEach(async () => {
		const module = await TestBuilder.builder()
			.setControllers([SignInController])
			.setProviders([
				{
					provide: "SignIn",
					useValue: {
						execute: jest.fn().mockResolvedValue("any_access_token")
					}
				}
			])
			.build();

		sut = module.get(SignInController);
		signInStub = module.get<SignIn>("SignIn");
	});

	it("should call execute with correct params", async () => {
		const executeSpy = jest.spyOn(signInStub, "execute");
		await sut.handle(signInRequestDTO);
		expect(executeSpy).toHaveBeenCalledWith(signInRequestDTO);
	});

	it("should return an access token on success", async () => {
		const httpResponse = await sut.handle(signInRequestDTO);
		expect(httpResponse).toEqual(new SignInResponseDTO(httpResponse.token));
	});
});
