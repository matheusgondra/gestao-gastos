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
		await this.hashGenerator.hash(accountData.password);
		await this.addAccountRepository.add(accountData);
		return null;
	}
}
