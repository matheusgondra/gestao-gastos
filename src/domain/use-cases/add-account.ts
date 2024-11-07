export interface AddAccount {
	add(accountData: AddAccountParams): Promise<AddAccountResult>;
}

export interface AddAccountParams {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export type AddAccountResult = { message: string } | null;
