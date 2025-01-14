import { ApiProperty } from "@nestjs/swagger";

export class SignUpResponseDTO {
	@ApiProperty({ description: "Message", example: "Account created successfully" })
	message: string;

	constructor(message: string) {
		this.message = message;
	}
}
