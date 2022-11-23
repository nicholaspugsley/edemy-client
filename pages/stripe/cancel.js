import UserRoute from "../../components/routes/UserRoute";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const StripeCancel = () => {
  return (
    <UserRoute showNav={false}>
      <div className="conatiner ">
        <div className="flex flex-col items-center justify-center">
          <div className="pt-10">
            <ArrowPathIcon className="h-32 w-32 stroke-red-600" />
          </div>
          <div className="text-3xl text-center pt-5">
            Payment failed. Try again.
          </div>
        </div>
        Think grids to fix
      </div>
    </UserRoute>
  );
};

export default StripeCancel;
