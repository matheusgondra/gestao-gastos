import { SignUpRequestDTO, SignUpResponseDTO } from "@/domain/user/dto";
import { UserController } from "@/domain/user/user.controller";
import { UserService } from "@/domain/user/user.service";
import { ConflictException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("UserController", () => {
	let sut: UserController;
	let userServiceStub: UserService;

	const signUpRequestDTO: SignUpRequestDTO = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "any_password"
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: {
						add: jest.fn().mockResolvedValue({ message: "Account created successfully" })
					}
				}
			]
		}).compile();

		sut = module.get<UserController>(UserController);
		userServiceStub = module.get(UserService);
	});

	it("should call add with correct params", async () => {
		const addSpy = jest.spyOn(userServiceStub, "add");
		await sut.handle(signUpRequestDTO);

		expect(addSpy).toHaveBeenCalledWith(signUpRequestDTO);
	});

	it("should return 409 if add returns null", async () => {
		jest.spyOn(userServiceStub, "add").mockResolvedValueOnce(null);
		const promise = sut.handle(signUpRequestDTO);

		await expect(promise).rejects.toThrow(new ConflictException("User already exists"));
	});

	it("should return a message on success", async () => {
		const httpResponse = await sut.handle(signUpRequestDTO);

		expect(httpResponse).toEqual(new SignUpResponseDTO("Account created successfully"));
	});
});
