import { AddAccount } from "@/domain/use-cases/add-account";
import { ConflictException, Inject } from "@nestjs/common";
import { SignUpRequestDTO } from "../dto/sign-up-request.dto";
import { HttpController } from "../protocols/controller";

export class SignUpController implements HttpController<SignUpRequestDTO, void> {
	constructor(
		@Inject("AddAccount")
		private readonly addAccount: AddAccount
	) {}

	async handle(request: SignUpRequestDTO): Promise<void> {
		const user = await this.addAccount.add(request);
		if (!user) {
			throw new ConflictException("User already exists");
		}
	}
}
