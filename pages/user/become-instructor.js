import { useContext, useState } from "react";
import { Context } from "../../context";
import axios from "axios";
import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  //state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe onboarding failed. Try again.");
      });
  };

  return (
    <>
      <div className=" bg-gray-200 min-h-screen ">
        <div className="text-center py-4 px-4 md:py-16 md:px-8 mb-8 bg-purple-500 font-bold text-white">
          <h1 className="text-6xl">Become Instructor page</h1>
          <p className="text-3xl py-5"></p>
        </div>

        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <ArrowPathIcon className="h-8 w-8" />
              <h1 className="text-5xl font-bold">
                Setup payouts to publish courses on Edemy
              </h1>
              <p className="py-6 text-red-700">
                Edemy partners with stripe to transfer earnings to your bank
                account
              </p>
              <button
                className="btn btn-primary"
                icon={
                  loading ? <ArrowPathIcon /> : <ArrowRightOnRectangleIcon />
                }
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processing..." : "Payout Setup"}
              </button>
              <p className="py-6">
                You will be directed to complete the stripe onboarding process.
                Estmated time 3 min.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
