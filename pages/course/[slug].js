import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../../components/modals/PreviewModal";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import { Context } from "../../context";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import "antd/dist/antd.css";

const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});

  // context
  const {
    state: { user },
  } = useContext(Context);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    //console.log("CHECK ENROLLMENT", data);
    setEnrolled(data);
  };

  // effect
  useEffect(() => {
    if (user && course) checkEnrollment();
  }, [user, course]);

  const router = useRouter();
  const { slug } = router.query;
  // destructure

  const handlePaidEnrollment = async () => {
    // console.log("handle paid enrollment");

    try {
      setLoading(true);
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast("Enrollment failed, try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const handleFreeEnrollment = async (e) => {
    // console.log("handle free enrollment");
    e.preventDefault();
    try {
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      toast(data.message);
      setLoading(false);
    } catch (err) {
      toast("Free enrollment failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container p-4">
        <h1 className="jumbotron text-center text-2xl text-white bg-primary square">
          Single Course View - Public
        </h1>

        {/* <div className="text-xl text-center">Course slug: {slug}</div> */}
        {/* <pre className="text-xl ">{JSON.stringify(course, null, 4)}</pre> */}

        <SingleCourseJumbotron
          course={course}
          showModal={showModal}
          setShowModal={setShowModal}
          preview={preview}
          setPreview={setPreview}
          user={user}
          loading={loading}
          handlePaidEnrollment={handlePaidEnrollment}
          handleFreeEnrollment={handleFreeEnrollment}
          enrolled={enrolled}
          setEnrolled={setEnrolled}
        />

        <PreviewModal
          showModal={showModal}
          setShowModal={setShowModal}
          preview={preview}
        />

        {/* {showModal ? course.lessons[0].video.Location : "dont show"} */}
        {course.lessons && (
          <SingleCourseLessons
            lessons={course.lessons}
            setPreview={setPreview}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);

  return {
    props: { course: data },
  };
}

export default SingleCourse;
