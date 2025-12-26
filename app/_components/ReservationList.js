"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
	// this hoot allows us to assume the action is successful and display the result before the async action is finished
	// if the action fail the page will be changed back
	const [optimisticBookings, optimisticDelete] = useOptimistic(
    // this is the original data
		bookings,
    // the is the data after the operation
		(curBookings, bookingId) => {
			return curBookings.filter(booking => booking.id !== bookingId);
		}
	);

	async function handleDelete(bookingId) {
		optimisticDelete(bookingId);
		await deleteBooking(bookingId);
	}

	return (
		<ul className="space-y-6">
			{optimisticBookings.map(booking => (
				<ReservationCard
					onDelete={handleDelete}
					booking={booking}
					key={booking.id}
				/>
			))}
		</ul>
	);
}

export default ReservationList;
