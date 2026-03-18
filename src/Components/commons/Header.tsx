import { useAppSelector, useAppDispatch } from "@store/hooks";
import { useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import HeaderRightBar from "./HeaderRightBar";
import { Logout } from "@store/Auth/AuthSlice";
const Header = () => {
  const [openMain, setOpenMain] = useState(false);
  const [openWelcome, setOpenWelcome] = useState(false);
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.AuthSlice);

  return (
    <header className="flex justify-between items-center">
      <div className="flex gap-4 relative">
        <RiMenu4Fill
          className="text-4xl lg:hidden text-primary cursor-pointer"
          onClick={() => setOpenMain(!openMain)}
        />

        <div
          className={`lg:flex gap-3 lg:gap-5 ${
            openMain
              ? "flex flex-col absolute left-0 top-12 bg-white text-black border border-primary p-5 w-52 rounded z-50"
              : "hidden"
          }`}
        >
          <RiMenu4Fill className="text-3xl hidden lg:block" />

          <NavLink className="text-lg font-bold" to="/">
            Home
          </NavLink>

          <NavLink className="text-lg font-bold" to="/categories">
            Collections
          </NavLink>

          {!accessToken ? (
            <NavLink className="text-lg font-bold" to="/register">
              Register
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenWelcome(!openWelcome)}
                className="text-lg font-bold flex items-center gap-2"
              >
                {`Welcome ${user?.firstName}`}
                <span className="text-sm">{openWelcome ? "▲" : "▼"}</span>
              </button>

              {openWelcome && (
                <div className="mt-2 ml-2 flex flex-col gap-2 border-2 border-primary pl-3 z-99 absolute left-0 top-8 bg-white p-2 rounded w-full text-center font-semibold">
                  <NavLink className="text-base" to="/profile" end>
                    Profile
                  </NavLink>
                  <NavLink className="text-base" to="profile/orders">
                    Orders
                  </NavLink>
                  <NavLink
                    className="text-base"
                    to="/"
                    onClick={() => dispatch(Logout())}
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <HeaderRightBar />
    </header>
  );
};

export default Header;
