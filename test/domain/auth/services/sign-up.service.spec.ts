import { SignUpService } from "@/domain/auth/services/signup.service";
import { BCryptAdapter } from "@/infra/cryptography/bcrypt.adapter";
import { UserRepository } from "@/infra/database/repositories/user.repository";
import { Test, TestingModule } from "@nestjs/testing";

describe("Signup Service", () => {
	let sut: SignUpService;
	let databaseStub: UserRepository;
	let hashServiceStub: BCryptAdapter;

	const fakeUser = {
		id: "any_id",
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "any_password",
		created_at: new Date(),
		updated_at: new Date()
	};

	const fakeUserData = {
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "hashed_password"
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SignUpService,
				{
					provide: UserRepository,
					useValue: {
						add: jest.fn().mockResolvedValue(fakeUser)
					}
				},
				{
					provide: BCryptAdapter,
					useValue: {
						hashGenerator: jest.fn().mockResolvedValue("hashed_password")
					}
				}
			]
		}).compile();

		sut = module.get(SignUpService);
		databaseStub = module.get(UserRepository);
		hashServiceStub = module.get(BCryptAdapter);
	});

	it("should call database with correct params", async () => {
		const addSpy = jest.spyOn(databaseStub, "add");
		await sut.execute(fakeUserData);
		expect(addSpy).toHaveBeenCalledWith(fakeUserData);
	});

	it("should throw if database throws", async () => {
		jest.spyOn(databaseStub, "add").mockRejectedValueOnce(new Error());
		const promise = sut.execute(fakeUserData);
		await expect(promise).rejects.toThrow();
	});

	it("should return null if database returns null", async () => {
		jest.spyOn(databaseStub, "add").mockResolvedValueOnce(null);
		const account = await sut.execute(fakeUserData);
		expect(account).toBeNull();
	});

	it("should call hashService with correct param", async () => {
		const spyHashService = jest.spyOn(hashServiceStub, "hashGenerator");
		await sut.execute(fakeUserData);
		expect(spyHashService).toHaveBeenCalledWith(fakeUserData.password);
	});
});
