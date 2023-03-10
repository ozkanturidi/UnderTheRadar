import RadarIcon from "@mui/icons-material/Radar";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import { Avatar } from "@mui/material";
import axios from "axios";
const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const userString = `/profile/${authCtx.userId}`;
  const [user, setUser] = useState({});

  const getUser = async (userId) => {
    if (!userId) {
      return;
    }
    const response = await axios.get(
      `http://localhost:8800/api/user/getUser/${userId}`
    );
    setUser(response.data);
  };
  useEffect(() => {
    getUser(authCtx.userId);
    console.log(authCtx.userId);
  }, [authCtx.userId]);

  return (
    <div className="bg-green-400 sticky top-0 z-50">
      <div className="flex justify-between container mx-auto py-3 items-center px-10">
        <RadarIcon fontSize="large" />
        <ul className="flex space-x-4 items-center text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/business/allTypes">Explore</Link>
          </li>
          {authCtx.isLoggedIn && (
            <li>
              <Link href={`/profile/${authCtx.userId}`}>Profile</Link>
            </li>
          )}
          {authCtx.isLoggedIn && user.img && (
            <Avatar src={user.img} sx={{ width: 48, height: 48 }} />
          )}
          {!authCtx.isLoggedIn && (
            <li className="border border-green-700 rounded-md px-2 py-1 hover:text-white hover:bg-green-700 transition-all duration-150 ">
              <Link href="/auth/login">Sign</Link>
            </li>
          )}
          {!authCtx.isLoggedIn && (
            <li className="border border-green-700 rounded-md px-2 py-1 hover:text-white hover:bg-green-700 transition-all duration-150 ">
              <Link href="/auth/register">Register</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <div onClick={authCtx.onLogout}>
              <li className="border border-green-700 rounded-md px-2 py-1 hover:text-white hover:bg-green-700 transition-all duration-150 ">
                <Link href="/">Logout</Link>
              </li>
            </div>
          )}

          <div></div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
