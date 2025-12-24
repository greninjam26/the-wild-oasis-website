import { Josefin_Sans } from "next/font/google";
// after this just add the className from josefin to HTML
const josefin = Josefin_Sans({
	subsets: ["latin"],
	// this is display everything with a default font the swap in this font
	display: "swap",
	// if the font weight is not variable we need weight:
});

import Header from "@/app/_components/Header";
import { ReservationProvider } from "@/app/_components/ReservationContext";
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
				className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
			>
				<Header />

				<div className="flex-1 px-8 py-12 grid">
					{/* the children props is the page.js since this is the only layout */}
					<main className="max-w-7xl mx-auto w-full">
						<ReservationProvider>{children}</ReservationProvider>
					</main>
				</div>
			</body>
		</html>
	);
}
