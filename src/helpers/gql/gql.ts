export type GraphQLErrorResponse = {
	response: {
		errors?: [{ message: string; extensions: { code: string } }]
	}
}
