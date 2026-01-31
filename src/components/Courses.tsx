import courses from "../data/courses.json"
import React, { useState } from "react"

const Courses = () => {
	const [cart, setcart] = useState<string[]>([])
	const [level, setlevel] = useState("All")

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
		const coursenumstr = String(course.number)

		if (level === "All") {
			return true
		}
		else if (level === "1000") {
			return coursenumstr.startsWith("1")
		}
		else if (level === "2000") {
			return coursenumstr.startsWith("2")
		}
		else if (level === "3000") {
			return coursenumstr.startsWith("3")
		}
		else if (level === "4000") {
			return coursenumstr.startsWith("4")
		}
		return false
	})

	return (
		<>
		<select value={level} onChange={(e) => setlevel(e.target.value)}>
            <option value="All">All Levels</option>
            <option value="1000">1000 Level</option>
            <option value="2000">2000 Level</option>
			<option value="3000">3000 level</option>
			<option value="4000">4000 level</option>
        </select>

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
					const isincart = cart.includes(String(number)) 

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
							<button onClick={() => handleToggleCartClick(number)}>
								{isincart ? "Remove from Cart" : "Add to Cart"}
							</button>
						</div>
					</div>
				)
			}
		)}
		</>
	)
}

export default Courses
