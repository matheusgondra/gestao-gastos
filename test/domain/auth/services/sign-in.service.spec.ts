import { SignInService } from "@/auth/services/signin.service";
import { BCryptAdapter } from "@/infra/cryptography/bcrypt.adapter";
import { UserRepositoryEntity } from "@/infra/database/entities/user.entity";
import { UserRepository } from "@/infra/database/repositories/user.repository";
import { NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

describe("SignInService", () => {
	let sut: SignInService;
	let databaseStub: UserRepository;
	let hashServiceStub: BCryptAdapter;
	let tokenServiceStub: JwtService;

	const fakeUser: UserRepositoryEntity = {
		id: "any_id",
		firstName: "any_first_name",
		lastName: "any_last_name",
		email: "any_email",
		password: "any_password",
		createdAt: new Date(),
		updatedAt: new Date()
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
						hashCompare: jest.fn().mockResolvedValue(true)
					}
				},
				{
					provide: JwtService,
					useValue: {
						signAsync: jest.fn().mockResolvedValue("any_access_token")
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
		jest.spyOn(databaseStub, "loadUserByEmail").mockRejectedValueOnce(new Error());
		const promise = sut.execute(signInData);
		await expect(promise).rejects.toThrow();
	});

	it("should return 404 if loadUserByEmail dont find an user", async () => {
		jest.spyOn(databaseStub, "loadUserByEmail").mockResolvedValueOnce(null);
		const promise = sut.execute(signInData);
		await expect(promise).rejects.toThrow(new NotFoundException("Email or password are not found!"));
	});

	it("should call hashCompare with correct params", async () => {
		const spyHash = jest.spyOn(hashServiceStub, "hashCompare");
		await sut.execute(signInData);
		expect(spyHash).toHaveBeenCalledWith(signInData.password, fakeUser.password);
	});

	it("should throw if hashCompare throws", async () => {
		jest.spyOn(hashServiceStub, "hashCompare").mockRejectedValueOnce(new Error());
		const promise = sut.execute(signInData);
		await expect(promise).rejects.toThrow();
	});

	it("should return 404 if hashCompare fail", async () => {
		jest.spyOn(databaseStub, "loadUserByEmail");
		jest.spyOn(hashServiceStub, "hashCompare").mockResolvedValueOnce(false);
		const promise = sut.execute(signInData);
		await expect(promise).rejects.toThrow(new NotFoundException("Email or password are not found!"));
	});

	it("should call signAsync with correct param", async () => {
		const spySignAsync = jest.spyOn(tokenServiceStub, "signAsync");
		await sut.execute(signInData);
		expect(spySignAsync).toHaveBeenCalledWith({ userId: fakeUser.id });
	});

	it("should throw if signAsync throws", async () => {
		jest.spyOn(tokenServiceStub, "signAsync").mockRejectedValueOnce(new Error());
		const promise = sut.execute(signInData);
		await expect(promise).rejects.toThrow();
	});

	it("should return an accessToken on success", async () => {
		const result = await sut.execute(signInData);
		expect(result).toEqual("any_access_token");
	});
});
