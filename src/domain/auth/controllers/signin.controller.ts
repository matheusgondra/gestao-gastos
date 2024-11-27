import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { SignInService } from "../services/signin.service";
import { SignInRequestDTO } from "../dto/sign-in-request.dto";
import { SignInResponseDTO } from "../dto/sign-in-response.dto";
import { Public } from "../constants/constants";

@Controller("signin")
export class SignInController {
	constructor(private readonly service: SignInService) {}
	@Public()
	@Post()
	async handle(@Body() request: SignInRequestDTO): Promise<SignInResponseDTO> {
		const accessToken = await this.service.execute(request);
		if (!accessToken) {
			throw new NotFoundException("Email or password is wrong");
		}
		return new SignInResponseDTO(accessToken);
	}
}
