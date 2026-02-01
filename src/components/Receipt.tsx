import { Link } from 'react-router-dom';
import coursesData from "../data/courses.json";

const Receipt = ({ cart }: any) => {
    
    const enrolledCourses = coursesData.filter(course => 
        cart.includes(course.number)
    );

    return (
        <div>
            <h1>Registration Successful</h1>
            <p>Here is your course receipt:</p>
            <hr />

            <div className="receipt-list">
                {enrolledCourses.map((course) => (
                    <div key={course.number}>
                        <h2>{course.dept} {course.number}</h2>
                        <p>{course.title}</p>
                    </div>
                ))}
            </div>

            <Link to="/"
            style={{ color: '#d4f0fc', fontWeight: 'bold' }}>
            Back to Search</Link>
        </div>
    );
};

export default Receipt;