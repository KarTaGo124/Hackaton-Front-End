import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import Header from "./components/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Navigate to="/auth/login" />} />
				<Route path="/auth/login" element={<Login />} />
				<Route path="/auth/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/edit" element={<Edit />} />
				<Route path="/create" element={<Create />} />
				<Route path="*" element={<div>Not Found</div>} />
			</Routes>
		</Router>
	);
}

export default App;
