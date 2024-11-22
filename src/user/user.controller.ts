import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignUpRequestDTO, SignUpResponseDTO } from "./dto";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("signup")
	async handle(@Body() data: SignUpRequestDTO): Promise<SignUpResponseDTO> {
		const user = await this.userService.add(data);
		if (!user) {
			throw new ConflictException("User already exists");
		}

		return new SignUpResponseDTO("Account created successfully");
	}
}
