import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import UserNav from "../nav/UserNav";

const UserRoute = ({ children, showNav = true }) => {
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      // console.log(data);
      if (data.ok) {
        setOk(true);
      }
    } catch (err) {
      console.log(err);
      setOk(true);
      router.push("/login");
    }
  };
  return (
    <>
      {!ok ? (
        <ArrowPathIcon className="h-20 w-20 text-blue-500 mr-2" />
      ) : (
        <div className="container max-w-full mx-auto ">
          <div className="flex flex-wrap ">
            <div className="md:w-1/5 pr-4 pl-4">{showNav && <UserNav />}</div>
            <div className="md:w-4/5">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserRoute;
