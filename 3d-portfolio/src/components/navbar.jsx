//https://www.cdnfonts.com/witch-2.font
import React from "react";
import { NavLink } from "react-router-dom";

const navbar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-10 h-10 rounded-lg bg-transparent items-center justify-center flex font-bold shadow-md"
      >
        <p
          style={{
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #FFD700, #B8860B)",
          }}
        >
          BK
        </p>{" "}
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-yellow-500" : "text-white"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "text-yellow-500" : "text-white"
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-yellow-500" : "text-white"
          }
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default navbar;
