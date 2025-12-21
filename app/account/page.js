// whatever javascript we write here will be server rendered

export const metadata = { title: "Guest area" };

export default function Page() {
	// a server component
	return (
		<div>
			<h1>Your account</h1>
		</div>
	);
}
