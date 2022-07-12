import { Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Signin from "./components/Signin.jsx";
import OTPVerify from "./components/OTPVerify";

export const AppContext = createContext();

function App() {
	const [auth, setAuth] = useState(false);
	const [verify, setVerify] = useState(false);
	const [id, setId] = useState("");

	return (
		<>
			<AppContext.Provider
				value={{ auth, setAuth, verify, setVerify, id, setId }}>
				<Routes>
					<Route path='/' element={<Signin />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/home'
						element={verify ? <Home /> : <Navigate to='/login' />}
					/>
					<Route
						path='/verify'
						element={auth ? <OTPVerify /> : <Navigate to='/' />}
					/>
				</Routes>
			</AppContext.Provider>
		</>
	);
}

export default App;
