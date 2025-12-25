// this is a file for Server Actions
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
	// we need to check if the user if authorized to do this
	const session = await auth();
	// it is common to not use try/catch in Server Action and just throw a error
	if (!session) throw new Error("You must be logged in");

	const nationalID = formData.get("nationalID");
	const [nationality, countryFlag] = formData.get("nationality").split("%");

	if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
		throw new Error("Please provide a valid national ID");

	const updateData = { nationality, nationalID, countryFlag };

	const { error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", session.user.guestId);

	if (error) {
		throw new Error("Guest could not be updated");
	}

	revalidatePath("./account/profile");
}
