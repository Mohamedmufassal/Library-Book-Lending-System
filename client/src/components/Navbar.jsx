import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          📚 Library System
        </Link>

        <div className="collapse navbar-collapse show">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/books">
                Books
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/members">
                Members
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/issue-book">
                Issue Book
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/return-book">
                Return Book
              </Link>
            </li>

          </ul>

          <span className="text-white me-3">
            {user?.name}
          </span>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;