// this is a file for Server Actions
"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
