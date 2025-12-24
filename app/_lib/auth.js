import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

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
		// this function will be ran before the signin process finishes
		// we have the user inputs but the user is not logged in yet
		// it will recive {account, profile} too
		async signIn({ user }) {
			try {
				const existingGuests = await getGuest(user.email);

				if (!existingGuests)
					await createGuest({ email: user.email, fullName: user.name });

				return true;
			} catch {
				return false;
			}
		},
		// this will run after the signIn callback and each time the session is checked out, like when we call the auth function
		// this method will allows us to get the id of the guest everywhere in the app
		async session({ session }) {
			const guest = await getGuest(session.user.email);
			session.user.guestId = guest.id;
			// we have to return the session or when we call auth function there will be no session left...
			return session;
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
