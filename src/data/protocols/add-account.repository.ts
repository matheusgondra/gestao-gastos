export interface AddAccountRepository {
	add(account: AddAccountRepositoryParams): Promise<AddAccountRepositoryResult>;
}

export interface AddAccountRepositoryParams {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface AddAccountRepositoryResult {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	created_at: Date;
	updated_at: Date;
}
