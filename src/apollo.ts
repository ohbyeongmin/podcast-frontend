import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { LOCAL_STORAGE_TOKEN } from "./constants";

export const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
export const isloggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

export const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					isLoggedIn: {
						read() {
							return isloggedInVar();
						},
					},
					token: {
						read() {
							return authTokenVar();
						},
					},
				},
			},
		},
	}),
});
