// whatever javascript we write here will be server rendered
// server components can be async and can just have await on the top level
export default function Page() {
	// a server component
	return (
		<div>
			<h1>Cabins page</h1>
		</div>
	);
}
