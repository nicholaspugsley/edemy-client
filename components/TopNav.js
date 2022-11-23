import React, { useState, useEffect, useContext } from "react";
// import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  HomeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const TopNav = () => {
  // state
  const [current, setCurrent] = useState("");

  // context
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  // router
  const router = useRouter();

  // old active nav
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  // logout function
  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <>
      <div className="navbar mb-2 bg-base-300 ">
        <div className="navbar-start">
          <Link href="/">
            <a className="btn btn-ghost normal-case text-xl" href="#">
              <HomeIcon className="h-6 w-6 text-blue-500 mr-2" />
              App
            </a>
          </Link>

          {user && user.role && user.role.includes("Instructor") ? (
            <Link href="/instructor/course/create">
              <a className="btn btn-ghost normal-case text-xl">
                <ArrowRightOnRectangleIcon className="h-6 w-6 text-blue-500 mr-2" />
                Create Course
              </a>
            </Link>
          ) : (
            <Link href="/user/become-instructor">
              <a className="btn btn-ghost normal-case text-xl">
                <ArrowRightOnRectangleIcon className="h-6 w-6 text-blue-500 mr-2" />
                Become Instructor
              </a>
            </Link>
          )}

          {user === null && (
            <>
              <Link href="/login">
                <a className="btn btn-ghost normal-case text-xl">
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-blue-500 mr-2" />
                  Login
                </a>
              </Link>
              <Link href="/register">
                <a className="btn btn-ghost normal-case text-xl">
                  <UserPlusIcon className="h-6 w-6 text-blue-500 mr-2" />
                  Register
                </a>
              </Link>
            </>
          )}
        </div>

        {user !== null && (
          <div className="navbar-end ">
            {user && user.role && user.role.includes("Instructor") && (
              <Link href="/instructor">
                <a className="btn btn-ghost normal-case text-xl mr-6">
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-blue-500 mr-2" />
                  Instructor Dash
                </a>
              </Link>
            )}
            <p className="text-1xl mr-4 mb-1">{user.name}</p>
            <div className=" dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  {user && user.role && user.role.includes("Instructor") && (
                    <Link href="/instructor">
                      <a className="btn btn-ghost    ">
                        <ArrowRightOnRectangleIcon className="h-6 w-6 text-blue-500 " />
                        Teacher Dash
                      </a>
                    </Link>
                  )}
                </li>
                <li>
                  <Link href="/user">
                    <a className="btn btn-ghost ">
                      <CalendarDaysIcon className="h-6 w-6 text-blue-500 mr-2" />
                      Student Dash
                    </a>
                  </Link>
                </li>
                <li>
                  <a className="btn btn-ghost " onClick={logout}>
                    <ArrowRightOnRectangleIcon className="h-6 w-6 text-blue-500 mr-2" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TopNav;
