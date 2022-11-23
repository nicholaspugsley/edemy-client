import { useState, useEffect } from "react";
import Link from "next/link";

const UserNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <ul className="menu bg-blue-300 mx-auto my-2 ">
      <li className="">
        <Link href="/user">
          <a>Dashboard</a>
        </Link>
      </li>
      <li className="">
        <Link href="/">
          <a>fill</a>
        </Link>
      </li>
    </ul>
  );
};

export default UserNav;
