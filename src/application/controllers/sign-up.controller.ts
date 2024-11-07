import { ConflictException, Inject } from "@nestjs/common";
import { AddAccount } from "src/domain/use-cases/add-account";
import { SignUpRequestDTO } from "../dto/sign-up-request.dto";
import { Controller } from "../protocols/controller";

export class SignUpController implements Controller<SignUpRequestDTO, void> {
	constructor(
		@Inject("AddAccount")
		private readonly addAccount: AddAccount
	) {}

	async handle(request: SignUpRequestDTO): Promise<void> {
		const user = await this.addAccount.add(request);
		if (!user) {
			throw new ConflictException("Account already exists");
		}
	}
}
