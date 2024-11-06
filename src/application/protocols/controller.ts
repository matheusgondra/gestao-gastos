export interface Controller<RequestType, ResponseType> {
	handle(request: RequestType): Promise<ResponseType>;
}
