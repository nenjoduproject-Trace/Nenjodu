import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCompass, faHouse, faMosque } from "@fortawesome/free-solid-svg-icons";

export default function BottomNav() {
  const items = [
    { path: "/", icon: faHouse, label: "Home" },
    { path: "/explore", icon: faCompass, label: "Explore Islam" },
    { path: "/quran", icon: faBookOpen, label: "Quran" },
    { path: "/practice", icon: faMosque, label: "Islam in Practice" },
  ];

  return (
    <nav className="bottom-nav">

      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `${isActive ? "bottom-active" : ""} ${item.path === "/ask" ? "ask-nav-item" : ""}`
          }
        >
          <FontAwesomeIcon icon={item.icon} className="mobile-fa-icon" aria-hidden="true" />
          <small>{item.label}</small>
        </NavLink>
      ))}

    </nav>
  );
}