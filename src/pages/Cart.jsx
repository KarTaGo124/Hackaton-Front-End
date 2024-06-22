import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { fetchCart, fetchGetItemById } from "../services/api";
import { jwtDecode } from "jwt-decode";

export default function Cart() {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const decodedToken = jwtDecode(localStorage.getItem("token"));
		const userId = decodedToken.username;
		console.log(userId);
		const cartResponse = fetchCart(userId);
		console.log(cartResponse);
		// console.log(cartResponse);
		// const itemsPromises = cartResponse.dat.items.map(async (cartItem) => {
		// 	const itemResponse = await fetchGetItemById(cartItem.itemId).data;
		// 	return {
		// 		...itemResponse,
		// 		quantity: cartItem.qty,
		// 	};
		// });
		// const itemsResponses = fetchGetItemById(itemsPromises);
		// setCartItems(itemsResponses);
	}, []);

	return (
		<div className="flex h-80 w-80 flex-col rounded-lg bg-white">
			{cartItems.map((key, cartItem) => (
				<CartItem key={key} id={cartItem.itemId} quantity={cartItem.quantity} />
			))}
		</div>
	);
}
