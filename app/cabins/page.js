import Navigation from "../components/Navigation";

// whatever javascript we write here will be server rendered
export default function Page() {
	// a server component
	return (
		<div>
			<Navigation />
			<h1>Cabins page</h1>
		</div>
	);
}
