import { CardActions, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { deleteCartItem } from "../services/api";

export default function CartItem({
	title,
	stars,
	price,
	isBestSeller,
	imageUrl,
	quantity,
}) {
	const handleDelete = async (id) => {
		await deleteCartItem(id);
		console.log("Item deleted");
	};

	return (
		<Card>
			<CardMedia image={imageUrl} />
			<CardContent>
				<label>Title: {title}</label>
				<label>Stars: {stars}</label>
				<label>Price: {price}</label>
				<label>Is Best Seller: {isBestSeller}</label>
				<label>Quantity: {quantity}</label>
			</CardContent>
			<CardActions>
				<button onClick={handleDelete}>Borrar item</button>
			</CardActions>
		</Card>
	);
}
