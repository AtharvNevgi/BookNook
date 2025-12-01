import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          📚 BookNook
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">

            <li className="nav-item mx-2">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/register"
              >
                Registration
              </NavLink>
            </li>

            <li className="nav-item mx-2">
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/admin"
              >
                Admin Login
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
