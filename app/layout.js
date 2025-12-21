import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import { Josefin_Sans } from "next/font/google";
// after this just add the className from josefin to HTML
const josefin = Josefin_Sans({
	subsets: ["latin"],
	// this is display everything with a default font the swap in this font
	display: "swap",
	// if the font weight is not variable we need weight:
});

import "@/app/_styles/globals.css";

// this will be come the metadata in the html for the web page
// we can replace this by output different metadata from the subpages
export const metadata = {
	title: {
		// the %s is just hte title output by different pages
		template: "%s / The Wild Oasis",
		default: "Welcome / The Wild Oasis",
	},
	discription:
		"Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
	// this is the basic struture of the server side layout
	// there are another way to add <head>, so only <html> and <body> here
	return (
		<html lang="en">
			<body
				className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
			>
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
