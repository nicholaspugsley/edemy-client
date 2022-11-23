import SingleCourse from "../../pages/course/[slug]";
import { currencyFormatter } from "../../utils/helpers";
import ReactPlayer from "react-player";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handleFreeEnrollment,
  handlePaidEnrollment,
  enrolled,
  setEnrolled,
}) => {
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;
  return (
    <div className="container w-full">
      <div className="flex">
        <div className="flex-col bg-slate-400 w-3/5  ">
          <div className="">{name}</div>
          <div className="">
            {description && description.substring(0, 160)}...
          </div>
          <div className="badge badge-primary">{category}</div>
          <div className="">Created by: {instructor.name}</div>
          <div className="">Last updated: {updatedAt}</div>
          <div className="">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </div>
        </div>
        //
        <div className="flex-col bg-slate-400 w-2/5">
          <div className="flex-row">
            {lessons[0].video && lessons[0].video.Location ? (
              <a
                onClick={() => {
                  setPreview(lessons[0].video.Location);
                  setShowModal(!showModal);
                }}
              >
                <div className="wrapper h-48 w-96 p-2">
                  <ReactPlayer
                    className="react-player-div"
                    url={lessons[0].video.Location}
                    playing={false}
                    controls={true}
                    light={image.Location}
                    width="100%"
                    height="100%"
                    muted={true}
                  />
                </div>
              </a>
            ) : (
              <img
                className="object-cover w-full h-72 p-2"
                src={image.Location}
                alt={name}
              />
            )}

            <div className="flex-row">
              {loading ? (
                <div>
                  <ArrowPathIcon className="h-6 w-6" />
                </div>
              ) : (
                <button
                  disabled={loading}
                  onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                  className="btn btn-primary m-2"
                >
                  {user
                    ? enrolled.status
                      ? "Go to course"
                      : "Enroll"
                    : "Login to Enroll"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;
