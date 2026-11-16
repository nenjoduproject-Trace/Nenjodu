import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDailymotion } from "@fortawesome/free-brands-svg-icons";
import { faBookOpen, faCompass, faGear, faHouse, faMagnifyingGlass, faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const menuItems = [
    { path: "/", icon: faHouse, label: "Home" },
    { path: "/explore", icon: faCompass, label: "Learn about Islam" },
    { path: "/practice", icon: faDailymotion, label: "Daily Practice" },
    { path: "/quran", icon: faBookOpen, label: "Recite Quran" },
    { path: "/search", icon: faMagnifyingGlass, label: "Search" },
    { path: "/about", icon: faCircleUser, label: "About" },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-title">
        Navigation
      </div>

      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FontAwesomeIcon icon={item.icon} className="sidebar-fa-icon" aria-hidden="true" />
          {item.label}
        </NavLink>
      ))}

      <div className="sidebar-bottom">

        <NavLink to="/admin" className="sidebar-link">
          <FontAwesomeIcon icon={faGear} className="sidebar-fa-icon" aria-hidden="true" />
          Admin
        </NavLink>

      </div>

    </aside>
  );
}