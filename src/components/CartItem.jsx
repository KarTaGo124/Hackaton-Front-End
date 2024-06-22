import { CardActions, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function CartItem({
	title,
	starts,
	price,
	isBestSeller,
	imageUrl,
	id,
}) {
	return (
		<Card>
			<CardMedia image={imageUrl} />
			<CardContent>
				<label>{title}</label>
				<label>{starts}</label>
				<label>{price}</label>
				<label>{isBestSeller}</label>
			</CardContent>
			<CardActions></CardActions>
		</Card>
	);
}
