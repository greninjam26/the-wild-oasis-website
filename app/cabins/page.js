// whatever javascript we write here will be server rendered
import CabinList from "@/app/_components/CabinList";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";

// we can put a variable or equation as the value of revalidate, it have to be a fix value
// but with the component dynamic this is useless
// export const revalidate = 3600;

export const metadata = { title: "Cabins" };

export default function Page({ searchParams }) {
	// set the filter to the capacity value of the searchParams, with ?. to check if capacity does not exist then set filter to "all"
	const filter = searchParams?.capacity ?? "all";

	return (
		<div>
			<h1 className="text-4xl mb-5 text-accent-400 font-medium">
				Our Luxury Cabins
			</h1>
			<p className="text-primary-200 text-lg mb-10">
				Cozy yet luxurious cabins, located right in the heart of the Italian
				Dolomites. Imagine waking up to beautiful mountain views, spending your
				days exploring the dark forests around, or just relaxing in your private
				hot tub under the stars. Enjoy nature's beauty in your own little home
				away from home. The perfect spot for a peaceful, calm vacation. Welcome to
				paradise.
			</p>

			<div className="flex justify-end mb-8">
				<Filter />
			</div>

			<Suspense
				fallback={<Spinner />}
				// by giving the Suspense a unique key, the fallback will be shown whenever the key changes too
				// this way we can show the spinner for page navigation as well
				key={filter}
			>
				<CabinList filter={filter} />
			</Suspense>
		</div>
	);
}
