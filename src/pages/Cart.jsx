import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { buyCart, fetchCart, fetchGetItemById } from "../services/api";
import { jwtDecode } from "jwt-decode";

export default function Cart({ setIsOpen }) {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		async function fetch() {
			const decodedToken = jwtDecode(localStorage.getItem("token"));
			const userId = decodedToken.username;
			const cartResponse = await fetchCart(userId);
			const itemsPromises = cartResponse.data.products.map(async (cartItem) => {
				const itemResponse = await fetchGetItemById(cartItem.item_id);
				return {
					...itemResponse.data,
					quantity: cartItem.qty,
				};
			});
			const items = await Promise.all(itemsPromises);
			console.log(items);
			setCartItems(items);
		}

		fetch();
	}, []);

	const handlePurchase = async () => {
		const decodedToken = jwtDecode(localStorage.getItem("token"));
		const userId = decodedToken.username;
		await buyCart(userId);
		setCartItems([]);
		setIsOpen(false);
		alert("Gracias por comprar!");
	};

	return (
		<div className="flex h-full w-full flex-col rounded-lg bg-white">
			{cartItems.map((cartItem) => {
				console.log(cartItem);
				return (
					<CartItem
						key={cartItem.asin}
						id={cartItem.asin}
						title={cartItem.title}
						stars={cartItem.stars}
						imageUrl={cartItem.imgUrl}
						quantity={cartItem.quantity}
						price={cartItem.price}
						isBestSeller={cartItem.isBestSeller}
					/>
				);
			})}

			<button onClick={handlePurchase}>Comprar</button>
		</div>
	);
}
