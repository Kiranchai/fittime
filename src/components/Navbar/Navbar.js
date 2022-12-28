import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";
import Hamburger from "hamburger-react";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { signout } = useAuth();

  const handleOnToggle = () => {
    setIconIsActive((prevState) => !prevState);
  };

  const [iconIsActive, setIconIsActive] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <span>
            <NavLink className="logo-link" to="/">
              <span style={{ color: "rgb(0, 180, 0)" }}>FIT</span>
              <span>TIME</span>
            </NavLink>
          </span>

          <span className="hamburger-span">
            <Hamburger onToggle={handleOnToggle} />
          </span>
        </div>

        <ul className={iconIsActive ? "navbar-list showed" : "navbar-list"}>
          <li>
            <NavLink className="navbar-link" to="/exercises">
              Ćwiczenia
            </NavLink>
          </li>

          <li>
            <NavLink className="navbar-link" to="/login">
              Konto
            </NavLink>
          </li>

          <li className="navbar-link" onClick={signout}>
            Wyloguj
          </li>
        </ul>
      </nav>
      <div className="navbar-separator"></div>

      <Outlet />
    </>
  );
};

export default Navbar;
