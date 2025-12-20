import Link from "next/link";

export default function Page() {
	return (
		<div>
			<h1>The Wild Oasis. Welcome to paradise. </h1>

			{/* this is not a good idea because it causes a fullpage reload */}
			{/* <a href="/cabins">Explore luxury cabins</a> */}
			{/* <Link href="/cabins">Explore luxury cabins</Link> */}
		</div>
	);
}
