import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// this will be come the metadata in the html for the web page
export const metadata = { title: "The Wild Oasis" };

export default function RootLayout({ children }) {
	// this is the basic struture of the server side layout
	// there are another way to add <head>, so only <html> and <body> here
	return (
		<html lang="en">
			<body>
				<header>
					<Logo />
					<Navigation />
				</header>
				{/* the children props is the page.js since this is the only layout */}
				<main>{children}</main>
				<footer>Copyright by The Wild Oasis</footer>
			</body>
		</html>
	);
}
