import { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import InstructorRoute from "../../components/routes/InstructorRoute";
import axios from "axios";
import {
  Cog6ToothIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { stripeCurrencyFormatter } from "../../utils/helpers";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sendBalanceRequest();
  }, []);

  const sendBalanceRequest = async () => {
    const { data } = await axios.get("/api/instructor/balance");
    setBalance(data);
  };

  const handlePayoutSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/instructor/payout-settings");
      window.location.href = data;
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Unable to access payout seetings. Try again later.");
    }
  };

  return (
    <InstructorRoute>
      {/* CONTAINER */}
      <div className="container mx-auto p-4 bg-slate-300">
        {/* REV REPORT */}
        <div className="flex">
          <div className="flex-col w-4/5">
            <div class="text-6xl">Revenue Report</div>
            <div class="text-2xl">
              You get paid directly from stripe to your bank account every 48
              hour.
            </div>
          </div>
          <div className="">
            <CurrencyDollarIcon
              onClick={handlePayoutSettings}
              className="h-10 w-10 cursor-pointer stroke-blue-500 "
            />
          </div>
        </div>
        <div className="divider"></div>
        {/* PENDING BALNCE */}
        <div className="flex">
          <div className="flex-col w-4/5">
            <div class="text-6xl">Pending Balance</div>
            <div class="text-2xl">For the last 48 hours</div>
            {/* <div class="text-2xl">{JSON.stringify(balance, null, 4)}</div> */}
          </div>
          <div className="flex-row">
            <span className="text-lg">
              Balance:{""}
              {balance.pending &&
                balance.pending.map((bp, i) => (
                  <span key={i} className="text-lg">
                    {stripeCurrencyFormatter(bp)}
                  </span>
                ))}
            </span>
          </div>
        </div>
        <div className="divider"></div>
        {/* PAYOUTS */}
        <div className="flex">
          <div className="flex-col w-4/5">
            <div class="text-6xl">Payouts</div>
            <div class="text-2xl">
              Update your stripe account details or view previous payouts.
            </div>
          </div>
          <div className="">
            {!loading ? (
              <Cog6ToothIcon
                onClick={handlePayoutSettings}
                className="h-10 w-10 cursor-pointer stroke-blue-500"
              />
            ) : (
              <ArrowPathIcon className="h-10 w-10 animate-spin stroke-blue-500" />
            )}
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorRevenue;
