import { useState, useEffect } from "react";
import Link from "next/link";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <ul className="menu bg-slate-300 container text-center">
      <li className="">
        <Link href="/instructor/course/create">
          <a>+ *add icon* Create New</a>
        </Link>
      </li>
      <div className="divider"></div>
      <div className="text-left pl-4">Adminstration</div>
      <li className="">
        <Link href="/instructor">
          <a className="font-bold">Instructor Dash</a>
        </Link>
      </li>
      <li className="">
        <Link href="/instructor/revenue">
          <a className="font-bold">$$$ Revenue $$$</a>
        </Link>
      </li>

      <div className="divider"></div>
      <div className="text-left pl-4">Academy</div>
      <li className="">
        <Link href="/instructor">
          <a className="font-bold">How-To *not built*</a>
        </Link>
      </li>
      <li className="">
        <Link href="/instructor">
          <a className="font-bold">Academy *not built*</a>
        </Link>
      </li>
    </ul>
  );
};

export default InstructorNav;
