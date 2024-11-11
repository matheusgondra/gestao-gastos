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
});
