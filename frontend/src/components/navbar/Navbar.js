import { NavLink, Link } from "react-router-dom";
import profile from "./images/profile.jpg";
import { FcTodoList } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
const Navbar = () => {
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };
  const isLoggin = useSelector((state) => state.isLoggin);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center">
      <a className="navbar-brand titleName d-flex align-items-center" href="/">
        <FcTodoList className="todoIcon" />
        TODO
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-3 navbar-ul ml-auto d-flex align-items-center">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={{ color: "black" }}
              to="/about"
            >
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" style={{ color: "black" }} to="/todo">
              Todo
            </NavLink>
          </li>
          {!isLoggin && (
            <>
              <li className="nav-item p-2">
                <Link className="nav-link nav-items-color" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link nav-items-color" to="/signin">
                  Sign In
                </Link>
              </li>
            </>
          )}
          {isLoggin && (
            <>
              <li className="nav-item">
                <a className="nav-link">
                  <img src={profile} className="profile" />
                </a>
              </li>
              <li className="nav-item p-2">
                <Link
                  className="nav-link nav-items-color"
                  href="/logout"
                  onClick={logout}
                >
                  Log Out
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
