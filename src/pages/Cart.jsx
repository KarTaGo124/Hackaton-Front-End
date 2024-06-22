import CartItem from "../components/CartItem";

export default function Cart({ data }) {
	return (
		<div className="flex h-80 w-80 flex-col rounded-lg bg-white">
			{Object.keys(data).map((key) => (
				<CartItem key={key} />
			))}
		</div>
	);
}
