import { Link } from 'react-router-dom';
import coursesData from "../data/courses.json";

const Receipt = ({ cart }: any) => {
    
    const enrolledCourses = coursesData.filter(course => 
        cart.includes(course.number)
    );

    return (
        <div>
            <h1>Registration Successful</h1>
            <p>Thank you for enrolling! Here is your official course summary:</p>
            <hr />

            <div className="receipt-list">
                {enrolledCourses.map((course) => (
                    <div key={course.number}>
                        <h2>{course.dept} {course.number}</h2>
                        <p>{course.title}</p>
                    </div>
                ))}
            </div>

            <Link to="/">← Back to Search</Link>
        </div>
    );
};

export default Receipt;