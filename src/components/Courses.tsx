import courses from "../data/courses.json"
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';

const Courses = ({ cart, setcart }: any) => {
	const [level, setlevel] = useState("All")
	const [search, setsearch] = useState("")
	const [cartpopup, setcartpopup] = useState(false)
	const navigate = useNavigate();

	const handleToggleCartClick = (courseNum: any) => {
		if (cart.includes(courseNum)) {
			setcart(cart.filter(id => id !== courseNum))
			alert("Removed from cart")
		} else {
			if (cart.length >=7) {
				alert("You have exceeded the maximum of seven courses")
				return
			}
		setcart([...cart, courseNum])
		}
	}

	const filtercourse = courses.filter((course: any) => {
		const searchterm = search.trim().toLowerCase()
		let matchlevel = false
		let matchsearch = false

		if (level === "All") {
			matchlevel = true
		}
		else if (level === "1000" && course.number < 200 ) {
			matchlevel = true
		}
		else if (level === "2000" && course.number >= 200 && course.number < 300) {
			matchlevel = true
		}
		else if (level === "3000" && course.number >= 300 && course.number < 400) {
			matchlevel = true
		}
		else if (level === "4000" && course.number >= 400) {
			matchlevel = true
		}

		if (search === "") {
			matchsearch = true
		}
		else if (String(course.number).includes(searchterm)) {
			matchsearch = true
		}
		else if (course.title.toLowerCase().includes(searchterm)) {
			matchsearch = true
		}
		else if (course.description.toLowerCase().includes(searchterm)) {
			matchsearch = true
		}

		return matchlevel && matchsearch
	})

	const cartcontent = () => {
	let tempcart = []
	for (let x=0; x < courses.length; x++) {
		if (cart.includes(courses[x].number)){
			tempcart.push(courses[x])
		}
	}
	return tempcart
	}
	const cartitem = cartcontent()

	const checkout = () => {
    	if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
		} else {
		navigate('/receipt')}
	};

	return (
	<div className ="pagefunctions">
		<div className ="userfunc">
		<input className = "searchbar"
			type = "text"
			value = {search}
			onChange = {(e) => {setsearch(e.target.value)}}/>

		<h4 className = "filterheading">Filter based on course level</h4>

		<select value={level} onChange={(e) => setlevel(e.target.value)}>
            <option value="All">All Levels</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
			<option value="3000">3000</option>
			<option value="4000">4000</option>
        </select>

			<button className = "cartbtn" onClick ={() => setcartpopup(true)}>
				Cart: ({cart.length})
			</button>
		</div>

		<div className = "courselist">
			{filtercourse.map(
				(
					{
						dept,
						number,
						title,
						description,
						prereqs,
						"cross-listed": crossListed,
					}: any
				) => {
					const isincart = cart.includes(number)

					return (
						<div key={number}>
						<br />
						<b>
							{dept} {number}: {title}
						</b>
						<br />
						{description}
						{prereqs && prereqs.length > 0 && (
							<>
								<br />
								<i>
									{" "}
									Prerequisites:{" "}
									{Array.isArray(prereqs) ? prereqs.join(", ") : prereqs}{" "}
								</i>
							</>
						)}
						{crossListed && crossListed.length > 0 && (
							<>
								<br />
								Cross-listed: {crossListed.join(", ")}
							</>
						)}
						<div>
							{!cart.includes(number) && (
								<button onClick={() => handleToggleCartClick(number)}>
								Add to cart
								</button>
							)}
						</div>
					</div>
				)
			}
		)}
		</div>

		{cartpopup && (
			<div className = "popupoverlay">
				<h3>Cart</h3>
				{cartitem.map((item) => (
					<div key={item.number}>
						{item.dept}{item.number}: {item.title}
					</div>
				))}

				<button onClick = {() => setcartpopup(false)}>close</button>
				<button onClick = {checkout}>checkout</button>
			</div>
		)}
	</div>
	)
}

export default Courses
