// whatever javascript we write here will be server rendered

export const metadata = { title: "Guest area" };

export default function Page() {
	// a server component
	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">
				Welcome Greninja
			</h2>
		</div>
	);
}
