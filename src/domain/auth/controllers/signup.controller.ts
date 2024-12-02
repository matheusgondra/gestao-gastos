import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { SignUpRequestDTO, SignUpResponseDTO } from "../dto";
import { SignUpService } from "../services";
import { Public } from "../constants/constants";

@Controller("signup")
export class SignUpController {
	constructor(private readonly service: SignUpService) {}

	@Public()
	@Post()
	async handle(@Body() request: SignUpRequestDTO): Promise<SignUpResponseDTO> {
		const user = await this.service.execute(request);
		if (!user) {
			throw new ConflictException("User already exists");
		}

		return new SignUpResponseDTO("Account created successfully");
	}
}
