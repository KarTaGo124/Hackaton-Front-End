import axios from "axios";
import { jwtDecode } from "jwt-decode";

const URL = "https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/";

export const getRoleBasedOnToken = () => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("No token found");
	}
	try {
		const decodedToken = jwtDecode(token);
		return decodedToken.role;
	} catch (error) {
		throw new Error("Invalid token format");
	}
};

export const fetchLogin = async (data) => {
	try {
		const res = await axios.post(`${URL}auth/login`, data);
		if (res.status === 200) {
			localStorage.setItem("token", res.data.token);
		}
		return res;
	} catch (error) {
		return error;
	}
};

export const fetchRegister = async (data) => {
	try {
		const res = await axios.post(`${URL}auth/register`, data);
		return res;
	} catch (error) {
		return error;
	}
};

export const fetchLogout = async () => {
	try {
		localStorage.removeItem("token");
		return { status: 200 };
	} catch (error) {
		return error;
	}
};

export const postItems = async (data) => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.post(`${URL}item`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (error) {
		return error;
	}
};

export const fetchItems = async (limit, lastkey) => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.get(
			`${URL}/items?limit=${limit}&lastKey=${lastkey}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return res;
	} catch (error) {
		return error;
	}
};

export const fetchEditItem = async (data) => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.put(`${URL}item`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (error) {
		return error;
	}
};

export const fetchGetItemById = async (id) => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.get(`${URL}item/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (error) {
		return error;
	}
};

export async function fetchCart(userId) {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(`${URL}cart/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
}

export const deleteProduct = async (id) => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.delete(`${URL}item/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res;
	} catch (error) {
		return error;
	}
};

export const addItemToCart = async (itemId, userId) => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.put(
			`${URL}cart`,
			{
				itemId,
				userId,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return res;
	} catch (error) {
		return error;
	}
};

export const deleteCartItem = async (data) => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.delete(`${URL}cart`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			data: data,
		});
		return res;
	} catch (error) {
		return error;
	}
};

export const buyCart = async (userId) => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.post(
			`${URL}buy`,
			{ userId },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return res;
	} catch (error) {
		return error;
	}
};
