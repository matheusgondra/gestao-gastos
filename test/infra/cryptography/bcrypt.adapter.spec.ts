import { BCryptAdapter } from "@/infra/cryptography/bcrypt.adapter";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt", () => {
	return {
		async hash(): Promise<string> {
			return "hashed_value";
		},
		async compare(): Promise<boolean> {
			return true;
		}
	};
});

describe("Bcrypt Adapter", () => {
	let sut: BCryptAdapter;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })],
			providers: [BCryptAdapter],
			exports: [BCryptAdapter]
		}).compile();

		sut = module.get(BCryptAdapter);
	});

	describe("HashGenerator", () => {
		it("should call hashGenerator with correct values", async () => {
			const hashSpy = jest.spyOn(bcrypt, "hash");
			await sut.hashGenerator("any_value");

			expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
		});

		it("should return a hashed value on hash success", async () => {
			const hash = await sut.hashGenerator("any_value");

			expect(hash).toBe("hashed_value");
		});

		it("should throw if hash throws", async () => {
			jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
				throw new Error();
			});

			const promise = sut.hashGenerator("any_value");

			await expect(promise).rejects.toThrow();
		});
	});

	describe("HashCompare", () => {
		it("should call hashCompare with correct params", async () => {
			const spyHashCompare = jest.spyOn(bcrypt, "compare");
			await sut.hashCompare("any_value", "any_hash");
			expect(spyHashCompare).toHaveBeenCalledWith("any_value", "any_hash");
		});

		it("should return true if hashCompare on success", async () => {
			const result = await sut.hashCompare("any_value", "any_hash");
			expect(result).toBeTruthy();
		});

		it("should throw if hashCompare throws", async () => {
			jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
				throw new Error();
			});
			const promise = sut.hashCompare("any_value", "any_hash");
			await expect(promise).rejects.toThrow();
		});
	});
});
