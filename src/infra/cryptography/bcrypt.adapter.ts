import { HashGenerator } from "@/data/protocols";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class BCryptAdapter implements HashGenerator {
	private readonly salt = 12;

	async hash(value: string): Promise<string> {
		return bcrypt.hash(value, this.salt);
	}
}
