import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { deleteProduct, addItemToCart } from "../services/api";

const Item = ({ data }) => {
	const navigate = useNavigate();
	const [id, setId] = useState("");
	const handleDelete = async () => {
		try {
			setId(localStorage.getItem("itemId"));
			await deleteProduct(id);
			console.log("Deleted");
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
		}
	};

	const handlePurchase = async () => {
		try {
			const decodedToken = jwtDecode(localStorage.getItem("token"));
			const userId = decodedToken.username;
			const response = await addItemToCart(data.asin, userId);
			console.log(response.message);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{Object.keys(data).map((key) => (
				<p key={key}>
					<strong>{key}:</strong> {data[key]}
				</p>
			))}
			<button onClick={handleDelete}>Delete Item</button>
			<button onClick={handlePurchase}>Comprar</button>
		</div>
	);
};

export default Item;
