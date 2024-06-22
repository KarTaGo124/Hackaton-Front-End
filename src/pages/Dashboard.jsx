import React, { useState, useEffect } from "react";
import Item from "../components/Item";
import { useNavigate } from "react-router-dom";
import { fetchItems } from "../services/api";

const Dashboard = () => {
	const [items, setItems] = useState([]);
	const [render, setRender] = useState(false);
	const navigate = useNavigate();

	const handleDelete = (id) => {
		setItems(items.filter((item) => item.id !== id));
		setRender(!render);
	};

	const handleLogout = async () => {
		try {
			console.log("Logged out");
			navigate("/auth/login");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchItems(10, null);

				setItems(response.data.items);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [render]);

	return (
		<>
			<div>
				<button onClick={handleLogout}>Logout</button>
			</div>
			<button onClick={() => navigate("/create")}>Create Item</button>
			<div>
				{items.map((item) => (
					<Item key={item.id} data={item} onDelete={handleDelete} />
				))}
			</div>
		</>
	);
};

export default Dashboard;
