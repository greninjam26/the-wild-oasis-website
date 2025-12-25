"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel }) {
	// this hook from React-DOM have to be in a component that is in the form
	// it can't be the component that contain the form
	const { pending } = useFormStatus();

	return (
		<button
			className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
			disabled={pending}
		>
			{pending ? pendingLabel : children}
		</button>
	);
}

export default SubmitButton;
