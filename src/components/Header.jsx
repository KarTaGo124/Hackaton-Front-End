import { Modal } from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";
import Cart from "../pages/Cart";
import { useState } from "react";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex w-full flex-row justify-between px-5 py-4">
			<img src="/amazon-logo.svg" width={100} />
			<FaCartShopping onClick={() => setIsOpen(true)} />
			<Modal
				open={isOpen}
				onClose={() => setIsOpen(false)}
				className="flex flex-col items-center justify-center"
			>
				<Cart setIsOpen={setIsOpen} />
			</Modal>
		</div>
	);
}
