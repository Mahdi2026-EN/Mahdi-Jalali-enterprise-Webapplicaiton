import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">CompusHub</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Dashboard</Link>
                    <Link className="nav-link" to="/courses">Courses</Link>
                    <Link className="nav-link" to="/students">Students</Link>
                    <Link className="nav-link" to="/sections">Sections</Link>
                    <Link className="nav-link" to="/registrations">
                        Registrations
                    </Link>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;