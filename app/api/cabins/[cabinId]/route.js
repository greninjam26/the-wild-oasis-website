// this is a custom API end point

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// this is for a GET Request
export async function GET(request, { params }) {
	const { cabinId } = params;

	// we need error handling since the Next.js default won't work here
	try {
		const [cabin, bookedDates] = await Promise.all([
			getCabin(cabinId),
			getBookedDatesByCabinId(cabinId),
		]);
		return Response.json({ cabin, bookedDates });
	} catch {
		return Response.json({ message: "Cabin not found" });
	}
}
// this is a POST
// export async function POST() {}
