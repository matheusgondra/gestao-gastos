export interface HttpController<RequestType, ResponseType> {
	handle(request: RequestType): Promise<ResponseType>;
}
