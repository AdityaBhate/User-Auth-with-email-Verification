import { Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Signin from "./components/Signin.jsx";

export const AppContext = createContext();

function App() {
	const [auth, setAuth] = useState(false);

	return (
		<>
			<AppContext.Provider value={{ auth, setAuth }}>
				<Routes>
					<Route path='/' element={<Signin />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/home'
						element={auth ? <Profile /> : <Navigate to='/login' />}
					/>
				</Routes>
			</AppContext.Provider>
		</>
	);
}

export default App;
