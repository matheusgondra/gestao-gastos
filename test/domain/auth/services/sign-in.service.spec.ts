import { SignInService } from "@/domain/auth/services/signin.service";
import { BCryptAdapter } from "@/infra/cryptography/bcrypt.adapter";
import { UserRepository } from "@/infra/database/repositories/user.repository";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

describe("SignInService", () => {
	let sut: SignInService;
	let databaseStub: UserRepository;
	let hashServiceStub: BCryptAdapter;
	let tokenServiceStub: JwtService;

	const fakeUser = {
		id: "any_id",
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "any_password",
		created_at: new Date(),
		updated_at: new Date()
	};

	const signInData = {
		email: "any_email",
		password: "hashed_password"
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SignInService,
				{
					provide: UserRepository,
					useValue: {
						loadUserByEmail: jest.fn().mockResolvedValue(fakeUser)
					}
				},
				{
					provide: BCryptAdapter,
					useValue: {
						hashCompare: jest.fn().mockResolvedValueOnce(true)
					}
				},
				{
					provide: JwtService,
					useValue: {
						signAsync: jest.fn().mockResolvedValueOnce("any_access_token")
					}
				}
			]
		}).compile();

		sut = module.get(SignInService);
		databaseStub = module.get(UserRepository);
		hashServiceStub = module.get(BCryptAdapter);
		tokenServiceStub = module.get(JwtService);
	});

	it("should call loadUserByEmail with correct param", async () => {
		const loadSpy = jest.spyOn(databaseStub, "loadUserByEmail");
		await sut.execute(signInData);
		expect(loadSpy).toHaveBeenCalledWith(signInData.email);
	});

	it("should throws if loadUserByEmail throws", async () => {
		jest.spyOn(databaseStub, "loadUserByEmail").mockRejectedValue(new Error());
		const promise = sut.execute(signInData);
		await expect(promise).rejects.toThrow();
	});

	it("should return null if loadUserByEmail find a user", async () => {
		jest.spyOn(databaseStub, "loadUserByEmail").mockResolvedValueOnce(null);
		const result = await sut.execute(signInData);
		expect(result).toBeNull();
	});
});
