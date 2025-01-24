export interface SignInData {
	email: string;
	password: string;
}

export interface SignIn {
	execute(data: SignInData): Promise<string>;
}
