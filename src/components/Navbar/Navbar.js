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
            <Hamburger onToggle={handleOnToggle} toggled={iconIsActive} />
          </span>
        </div>

        <ul className={iconIsActive ? "navbar-list showed" : "navbar-list"}>
          <NavbarListItem
            destination={"exercises"}
            name={"Ćwiczenia"}
            collapse={handleOnToggle}
          />
          <NavbarListItem
            destination={"account"}
            name={"Konto"}
            collapse={handleOnToggle}
          />

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

const NavbarListItem = ({ name, destination, collapse }) => {
  return (
    <li
      onClick={() => {
        collapse((prevState) => !prevState);
      }}
    >
      <NavLink className="navbar-link" to={`/${destination}`}>
        {name}
      </NavLink>
    </li>
  );
};

export default Navbar;
