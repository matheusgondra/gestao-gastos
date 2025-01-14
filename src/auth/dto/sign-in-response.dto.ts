import { ApiProperty } from "@nestjs/swagger";

export class SignInResponseDTO {
	@ApiProperty({ description: "JWT Token", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" })
	token: string;

	constructor(token: string) {
		this.token = token;
	}
}
