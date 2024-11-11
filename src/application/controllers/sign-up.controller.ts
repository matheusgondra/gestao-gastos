import { AddAccount } from "@/domain/use-cases/add-account";
import { Body, ConflictException, Controller, Inject, Post } from "@nestjs/common";
import { HttpController } from "../protocols/controller";
import { SignUpRequestDTO, SignUpResponseDTO } from "../dto";

@Controller("signup")
export class SignUpController implements HttpController<SignUpRequestDTO, SignUpResponseDTO> {
	constructor(
		@Inject("AddAccount")
		private readonly addAccount: AddAccount
	) {}

	@Post()
	async handle(@Body() request: SignUpRequestDTO): Promise<SignUpResponseDTO> {
		const user = await this.addAccount.add(request);
		if (!user) {
			throw new ConflictException("User already exists");
		}

		return new SignUpResponseDTO("Account created successfully");
	}
}
