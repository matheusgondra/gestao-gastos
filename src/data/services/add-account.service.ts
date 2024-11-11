import { AddAccount, AddAccountParams, AddAccountResult } from "@/domain/use-cases/add-account";
import { Inject, Injectable } from "@nestjs/common";
import { AddAccountRepository, HashGenerator } from "../protocols";

@Injectable()
export class AddAccountService implements AddAccount {
	constructor(
		@Inject("AddAccountRepository")
		private readonly addAccountRepository: AddAccountRepository,

		@Inject("HashGenerator")
		private readonly hashGenerator: HashGenerator
	) {}

	async add(accountData: AddAccountParams): Promise<AddAccountResult> {
		const hashedPassword = await this.hashGenerator.hash(accountData.password);
		const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }));
		if (!account) {
			return null;
		}

		return null;
	}
}
