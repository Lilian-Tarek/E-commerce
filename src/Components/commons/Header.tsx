import React, { useState } from 'react'
import { RiMenu4Fill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import HeaderRightBar from './HeaderRightBar';
const Header = () => {

    const [open, SetIsOpen] = useState(false);
  return (
    <header className="flex justify-between items-center">
      <div className="flex gap-4 relative">
        <RiMenu4Fill
          className="text-4xl lg:hidden text-primary"
          onClick={() => {
            SetIsOpen(!open);
          }}
        />
        <div
          className={`lg:flex gap-3 lg:gap-5 ${open ? "flex flex-col absolute left-0 top-12 bg-black text-white p-5 w-50 rounded" : "hidden"}`}
        >
          <RiMenu4Fill className="text-3xl hidden lg:block " />
          <NavLink className="text-lg font-bold" to="/">
            Home
          </NavLink>
          <NavLink className="text-lg font-bold" to="/categories">
            Collections
          </NavLink>
          <NavLink className="text-lg font-bold" to="/about">
            About
          </NavLink>
          <NavLink className="text-lg font-bold" to="/register">
            Register
          </NavLink>
        </div>
      </div>
  <HeaderRightBar/>
    </header>
  );
}

export default Header
