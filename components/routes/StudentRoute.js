import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import UserNav from "../nav/UserNav";

const StudentRoute = ({ children, showNav = true }) => {
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
        <div className="container mx-auto">{children}</div>
      )}
    </>
  );
};

export default StudentRoute;
