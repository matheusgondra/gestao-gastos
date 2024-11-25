import { BCryptAdapter } from "@/adapter/bcrypt.adapter";
import { UserRepository } from "@/database/repositories/user.repository";
import { UserService } from "@/user/user.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("UserService", () => {
	let sut: UserService;
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
				UserService,
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

		sut = module.get(UserService);
		databaseStub = module.get(UserRepository);
		hashServiceStub = module.get(BCryptAdapter);
	});

	it("should call database with correct params", async () => {
		const addSpy = jest.spyOn(databaseStub, "add");
		await sut.add(fakeUserData);

		expect(addSpy).toHaveBeenCalledWith(fakeUserData);
	});

	it("should throw if database throws", async () => {
		jest.spyOn(databaseStub, "add").mockRejectedValueOnce(new Error());
		const promise = sut.add(fakeUserData);

		await expect(promise).rejects.toThrow();
	});

	it("should return null if database returns null", async () => {
		jest.spyOn(databaseStub, "add").mockResolvedValueOnce(null);
		const account = await sut.add(fakeUserData);

		expect(account).toBeNull();
	});

	it("should call HashService with correct password", async () => {
		const hashSpy = jest.spyOn(hashServiceStub, "hashGenerator");
		await sut.add(fakeUserData);

		expect(hashSpy).toHaveBeenCalledWith(fakeUserData.password);
	});

	it("should throw if HashService throws", async () => {
		jest.spyOn(hashServiceStub, "hashGenerator").mockRejectedValueOnce(new Error());
		const promise = sut.add(fakeUserData);

		await expect(promise).rejects.toThrow();
	});

	it("should return a user on success", async () => {
		const response = await sut.add(fakeUserData);

		expect(response).toEqual(fakeUser);
	});
});
