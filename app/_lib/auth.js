import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		// this function will be ran when the middleware is ran
		authorized({ auth, request }) {
			// !! is an easy way to convert something to boolean by checking if they exist or not
			return !!auth?.user;
		},
	},
	pages: {
		signIn: "/login",
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
