import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import {
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger";
import { Public } from "../constants/constants";
import { SignUpRequestDTO, SignUpResponseDTO } from "../dto";
import { SignUpService } from "../services";

@ApiTags("Auth")
@Controller("signup")
export class SignUpController {
	constructor(private readonly service: SignUpService) {}

	@ApiOperation({ summary: "Sign up" })
	@ApiCreatedResponse({ description: "Account created successfully", type: SignUpResponseDTO })
	@ApiConflictResponse({
		description: "User already exists",
		type: ConflictException,
		example: {
			message: "User already exists",
			error: "Conflict",
			statusCode: 409
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
	async handle(@Body() request: SignUpRequestDTO): Promise<SignUpResponseDTO> {
		const user = await this.service.execute(request);
		if (!user) {
			throw new ConflictException("User already exists");
		}

		return new SignUpResponseDTO("Account created successfully");
	}
}
