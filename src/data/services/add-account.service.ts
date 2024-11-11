import { AddAccount, AddAccountParams, AddAccountResult } from "@/domain/use-cases/add-account";
import { Inject, Injectable } from "@nestjs/common";
import { AddAccountRepository } from "../protocols";

@Injectable()
export class AddAccountService implements AddAccount {
	constructor(
		@Inject("AddAccountRepository")
		private readonly addAccountRepository: AddAccountRepository
	) {}

	async add(accountData: AddAccountParams): Promise<AddAccountResult> {
		await this.addAccountRepository.add(accountData);
		return null;
	}
}
