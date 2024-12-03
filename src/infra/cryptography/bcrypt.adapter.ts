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

	async hashCompare(value: string, hash: string): Promise<boolean> {
		const isValid = await bcrypt.compare(value, hash);
		return isValid;
	}
}
