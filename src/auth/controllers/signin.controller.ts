import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import {
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger";
import { Public } from "../constants/constants";
import { SignInRequestDTO, SignInResponseDTO } from "../dto";
import { SignInService } from "../services";

@ApiTags("Auth")
@Controller("signin")
export class SignInController {
	constructor(private readonly service: SignInService) {}

	@ApiOperation({ summary: "Sign in" })
	@ApiOkResponse({ description: "Access token", type: SignInResponseDTO })
	@ApiNotFoundResponse({
		description: "Email or password are not found",
		type: NotFoundException,
		example: {
			message: "Email or password are not found",
			error: "Not Found",
			statusCode: 404
		}
	})
	@ApiInternalServerErrorResponse({
		description: "Internal server error",
		example: {
			message: "Internal server error",
			error: "Internal Server Error",
			statusCode: 500
		}
	})
	@Public()
	@Post()
	async handle(@Body() request: SignInRequestDTO): Promise<SignInResponseDTO> {
		const accessToken = await this.service.execute(request);
		return new SignInResponseDTO(accessToken);
	}
}
