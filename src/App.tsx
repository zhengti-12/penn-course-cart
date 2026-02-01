import Nav from "./components/Nav"
import Courses from "./components/Courses"
import Cart from "./components/Cart"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Receipt from './components/Receipt';
import React, { useState } from "react";

function App() {
	const [cart, setcart] = useState<any[]>([]);

	return (
		<BrowserRouter>
		<>
			<Nav />
			<div
				style={{
					width: "100%",
					boxSizing: "border-box",
					padding: "0 calc(1rem + 10%)",
				}}>
				<Routes>
					<Route path ="/" element = {
					<>
					<Courses cart={cart} setcart={setcart} />
					</>
				} />
				<Route path="/receipt" element={<Receipt cart={cart} />} />
				</Routes>
			</div>
		</>
		</BrowserRouter>
	)
}

export default App
