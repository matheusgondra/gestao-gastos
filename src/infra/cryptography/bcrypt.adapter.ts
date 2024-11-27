import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class BCryptAdapter {
	constructor(private readonly configService: ConfigService) {}

	async hashGenerator(value: string): Promise<string> {
		const salt = this.configService.get<number>("SALT");
		return bcrypt.hash(value, Number(salt));
	}
}
