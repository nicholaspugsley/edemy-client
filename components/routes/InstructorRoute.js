import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import InstructorNav from "../nav/InstructorNav";

const InstructorRoute = ({ children }) => {
  // state
  const [ok, setOk] = useState(false);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
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
        <ArrowPathIcon className=" h-20 w-20 animate-spin text-blue-500 mr-2" />
      ) : (
        <div className="container max-w-full mx-auto ">
          <div className="flex flex-wrap ">
            <div className="md:w-1/5 p-2 bg-slate-300">
              <InstructorNav />
            </div>
            <div className="md:w-4/5">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorRoute;
