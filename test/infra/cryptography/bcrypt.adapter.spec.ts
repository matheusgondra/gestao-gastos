import { BCryptAdapter } from "@/infra/cryptography/bcrypt.adapter";
import { Test } from "@nestjs/testing";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt", () => {
	return {
		async hash(): Promise<string> {
			return "hashed_value";
		}
	};
});

describe("Bcrypt Adapter", () => {
	let sut: BCryptAdapter;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [BCryptAdapter]
		}).compile();

		sut = module.get<BCryptAdapter>(BCryptAdapter);
	});

	it("should call hash with correct values", async () => {
		const hashSpy = jest.spyOn(bcrypt, "hash");
		await sut.hash("any_value");

		expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
	});

	it("should return a hashed value on hash success", async () => {
		const hash = await sut.hash("any_value");

		expect(hash).toBe("hashed_value");
	});

	it("should throw if hash throws", async () => {
		jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
			throw new Error();
		});

		const promise = sut.hash("any_value");

		await expect(promise).rejects.toThrow();
	});
});
