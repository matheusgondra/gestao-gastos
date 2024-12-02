import { Body, Controller, Post } from "@nestjs/common";
import { SignInService } from "../services";
import { SignInResponseDTO, SignInRequestDTO } from "../dto";
import { Public } from "../constants/constants";

@Controller("signin")
export class SignInController {
	constructor(private readonly service: SignInService) {}
	@Public()
	@Post()
	async handle(@Body() request: SignInRequestDTO): Promise<SignInResponseDTO> {
		const accessToken = await this.service.execute(request);
		return new SignInResponseDTO(accessToken);
	}
}
