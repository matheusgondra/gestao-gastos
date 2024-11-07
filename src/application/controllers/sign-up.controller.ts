import { AddAccount } from "@/domain/use-cases/add-account";
import { ConflictException, Inject, InternalServerErrorException } from "@nestjs/common";
import { SignUpRequestDTO } from "../dto/sign-up-request.dto";
import { Controller } from "../protocols/controller";

export class SignUpController implements Controller<SignUpRequestDTO, void> {
	constructor(
		@Inject("AddAccount")
		private readonly addAccount: AddAccount
	) {}

	async handle(request: SignUpRequestDTO): Promise<void> {
		try {
			const user = await this.addAccount.add(request);
			if (!user) {
				throw new ConflictException("Account already exists");
			}
		} catch (error) {
			if (error instanceof ConflictException) {
				throw error;
			}

			throw new InternalServerErrorException();
		}
	}
}
