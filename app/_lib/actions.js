// this is a file for Server Actions
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

	revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
	// we need to check if the user if authorized to do this
	const session = await auth();
	// it is common to not use try/catch in Server Action and just throw a error
	if (!session) throw new Error("You must be logged in");

	// get all the ids of bookings of the user
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map(booking => booking.id);

	// check if the booking the user is mutating is their own
	if (!guestBookingIds.includes(bookingId))
		throw new Error("You are not allowed to delete this booking");

	const { error } = await supabase.from("bookings").delete().eq("id", bookingId);

	if (error) {
		throw new Error("Booking could not be deleted");
	}

	revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
	const bookingId = Number(formData.get("bookingId"));

	// we need to check if the user if authorized to do this
	const session = await auth();
	// it is common to not use try/catch in Server Action and just throw a error
	if (!session) throw new Error("You must be logged in");

	// get all the ids of bookings of the user
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map(booking => booking.id);

	// check if the booking the user is mutating is their own
	if (!guestBookingIds.includes(bookingId))
		throw new Error("You are not allowed to delete this booking");

	const updateData = {
		numGuests: Number(formData.get("numGuests")),
		// make sure the observations is not too long
		observations: formData.get("observations").slice(0, 1000),
	};

	const { error } = await supabase
		.from("bookings")
		.update(updateData)
		.eq("id", bookingId);

	if (error) {
		throw new Error("Booking could not be updated");
	}

	revalidatePath("/account/reservations");
	revalidatePath(`/account/reservations/edit/${bookingId}`);
	redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
	// we need to check if the user if authorized to do this
	const session = await auth();
	// it is common to not use try/catch in Server Action and just throw a error
	if (!session) throw new Error("You must be logged in");

	const newBooking = {
		...bookingData,
		guestId: session.user.guestId,
		numGuests: Number(formData.get("numGuests")),
		observations: formData.get("observations").slice(0, 1000),
		extrasPrice: 0,
		totalPrice: bookingData.cabinPrice,
		isPaid: false,
		hasBreakfast: false,
		status: "unconfirmed",
	};

	const { error } = await supabase.from("bookings").insert([newBooking]);

	if (error) {
		throw new Error("Booking could not be created");
	}

	revalidatePath(`/cabins/${bookingData.cabinId}`);
	redirect("/cabins/thankyou");
}
