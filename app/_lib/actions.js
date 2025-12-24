// this is a file for Server Actions
"use server";

import { signIn } from "./auth";

export async function signInAction() {
	await signIn("google", { redirectTo: "/account" });
}
