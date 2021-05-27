module.exports = {
	client: {
		tagName: "gql",
		includes: ["./src/**/*.tsx"],
		service: {
			name: "podcast-backend",
			url: "http://localhost:4000/graphql",
		},
	},
};
