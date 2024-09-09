import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../services/userContext";
import "./navbar.css";
import logo from "../../images/logo.png";
import { cn } from "../../utils/utils";

export default function NavbarCostum({ navItems }) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const { logout, currentUser } = useAuth();
  const location = useLocation();

  const handleToggleClick = () => {
    setNavigationOpen((prevState) => !prevState);
  };

  const handleLogoClick = () => {
    setNavbarVisible((prevState) => !prevState);
  };

  return (
    <div className="navCustomer">
      {navbarVisible ? (
        <div
          className={cn(
            navigationOpen ? "navigation active" : "navigation",
            "bg-gradient-to-b from-orange-300 to-orange-700 border border-l-8 border-transparent"
          )}
        >
          <div className="logo my-4 py-2" onClick={handleLogoClick}>
            <span className="icon">
              <img
                src={logo}
                alt="logo de l'entreprise"
                height={60}
                width={60}
              />
            </span>
            <span className="title">SOS PET</span>
          </div>
          <ul>
            {navItems.map((item, index) => {
              const isActive = item.url === location.pathname;
              const hasAccess = item.access.includes(
                currentUser ? "user" : "guest"
              );

              return (
                <li key={index} className="my-2">
                  <Link
                    to={item.url}
                    onClick={() => {
                      if (item.label === "Sign Out" && currentUser) {
                        logout();
                      }
                      handleLogoClick();
                    }}
                    className={`linkCustomer flex flex-row items-center gap-7 ${
                      isActive && hasAccess ? "activeItem" : ""
                    } ${!hasAccess ? "notAccess" : ""}`}
                  >
                    <span className="">{item.icon}</span>
                    <span className="title">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="toggle" onClick={handleToggleClick}></div>
        </div>
      ) : (
        <div
          className="logo-container cursor-pointer flex items-center bg-gradient-to-b from-orange-300 to-orange-700 border border-l-8 border-transparent"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="logo de l'entreprise" height={60} width={60} />
        </div>
      )}
    </div>
  );
}
