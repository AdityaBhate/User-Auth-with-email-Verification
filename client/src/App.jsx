import { Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signin from "./components/Signin";

export const AppContext = createContext();

function App() {
	const [auth, setAuth] = useState(false);

	return (
		<>
			<AppContext.Provider value={{ auth, setAuth }}>
				<Routes>
					<Route path='/' element={<Signin />} />
					<Route path='/login' element={<Login />} />
					<Route path='/home' element={<Profile username='Aditya' />} />
				</Routes>
			</AppContext.Provider>
		</>
	);
}

export default App;
