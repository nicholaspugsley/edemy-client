import { useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import UserRoute from "../../../components/routes/UserRoute";
import { useRouter } from "next/router";
import axios from "axios";

const StripeSuccess = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) successRequest();
  }, [id]);

  const successRequest = async () => {
    const { data } = await axios.get(`/api/stripe-success/${id}`);
    // console.log("SUCCESS REQ DATA", data);
    router.push(`/user/course/${data.course.slug}`);
  };

  return (
    <UserRoute showNav={false}>
      <div className="conatiner">
        <div></div>
        <ArrowPathIcon className="animate-spin" />
      </div>
    </UserRoute>
  );
};

export default StripeSuccess;
