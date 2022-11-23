import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

import axios from "axios";

const StripeCallback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      axios.post("/api/get-account-status").then((res) => {
        // console.log(res);
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/instructor";
      });
    }
  }, [user]);

  return <ArrowPathIcon className="animate-spin h-32 w-32" />;
};

export default StripeCallback;
