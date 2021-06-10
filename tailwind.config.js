const colors = require("tailwindcss/colors");

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blueGray: colors.blueGray,
				coolGray: colors.coolGray,
				trueGray: colors.trueGray,
				warmGray: colors.warmGray,
				indigo: colors.indigo,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
