// whatever javascript we write here will be server rendered

import Counter from "../components/counter";

// server components can be async and can just have await on the top level
export default async function Page() {
	// when the page is loaded, it takes sometime to fetch the data in the server then send to the client
	// but once it is done then it will be cached in the browser
	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await res.json();

	// since this is a server component, so the console.log result show up in the terminal and not in the console of the website
	// console.log(data);

	// a server component
	return (
		<div>
			<h1>Cabins page</h1>
			<ul>
				{data.map(user => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
			<Counter users={data} />
		</div>
	);
}
