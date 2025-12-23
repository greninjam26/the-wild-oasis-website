"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
	// this custom hook give use the searchParams
	const searchParams = useSearchParams();
	// this one allows us to replace the old URL with the new one
	const router = useRouter();
	// this provides the pathname of the current page
	const pathname = usePathname();

	const activeFilter = searchParams.get("capacity") ?? "all";

	function handleFilter(filter) {
		// obtain the searchParams
		const params = new URLSearchParams(searchParams);
		// change capacity to the value of filter
		params.set("capacity", filter);
		// replace the old URL with the new one
		router.replace(
			// we have to change the params to string for it to work
			`${pathname}?${params.toString()}`,
			// stops the page scroll back up to the top
			{ scroll: false }
		);
	}

	return (
		<div className="border border-primary-800 flex">
			<Button
				filter={"all"}
				activeFilter={activeFilter}
				handleFilter={handleFilter}
			>
				All cabins
			</Button>
			<Button
				filter={"small"}
				activeFilter={activeFilter}
				handleFilter={handleFilter}
			>
				1&mdash;3 guests
			</Button>
			<Button
				filter={"medium"}
				activeFilter={activeFilter}
				handleFilter={handleFilter}
			>
				4&mdash;7 guests
			</Button>
			<Button
				filter={"large"}
				activeFilter={activeFilter}
				handleFilter={handleFilter}
			>
				8&mdash;12 guests
			</Button>
		</div>
	);
}

function Button({ children, filter, activeFilter, handleFilter }) {
	return (
		<button
			className={`px-5 py-2 hover:bg-primary-700 ${
				activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
			}`}
			onClick={() => handleFilter(filter)}
		>
			{children}
		</button>
	);
}

export default Filter;
