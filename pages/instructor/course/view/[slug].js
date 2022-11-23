import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  HomeIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  CheckIcon,
  ArrowUpOnSquareIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";
// ANTD
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import Item from "antd/lib/list/Item";

const CourseView = () => {
  const [course, setCourse] = useState({});
  // for lessons
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);

  // student count
  const [students, setStudents] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course && studentCount();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  // FUNCTIONS FOR STUDENT COUNT
  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    console.log("STUDENT count =>", data);
    setStudents(data.length);
  };

  // FUNCTIONS FOR ADD LESSON
  const handleAddLesson = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      // console.log(data)
      setValues({ ...values, title: "", content: "", video: {} });
      setProgress(0);
      setUploadButtonText("Upload video");
      setVisible(false);
      setCourse(data);
      toast("Lesson added");
    } catch (err) {
      console.log(err);
      toast("Lesson add failed");
    }
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      // save progress bar and send video a form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      // once response is recieved
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video upload failed");
    }
  };

  const handleVideoRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setValues({ ...values, video: {} });
      setProgress(0);
      setUploading(false);
      setUploadButtonText("Video Lesson Uploaded :)");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video deletion failed");
    }
  };

  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you publish your course, it will be live in the marketplace for users to enroll"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      toast("Congrats! Your course is now live!!");
    } catch (err) {
      toast("Course published failed. Try again.");
    }
  };

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you UNpublish your course, it will be offline, not live in marketplace"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);
      toast("Your course is unpublished");
    } catch (err) {
      toast("Course unpublished failed.");
    }
  };

  return (
    <InstructorRoute>
      <div className="container mx-auto sm:px-4 max-w-full  pt-3">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
        {course && (
          <div className="container max-w-full mx-auto sm:px-4 pt-3">
            <div className="flex flex-row ">
              {/* 1/3 */}
              <div className="basis-1/4">
                <img
                  className="mask mask-circle h-20 w-20"
                  src={course.image ? course.image.Location : "/course.png"}
                />
              </div>

              {/* 2/3 */}
              <div className="basis-2/4">
                <div className="text-4xl text-blue-600">
                  {course.name} lessons
                </div>
                <div className="text-2xl">
                  {course.lessons && course.lessons.length} Lessons
                </div>
                <div className="text-2xl">{course.category}</div>
              </div>

              {/* 3/3 */}
              <div className="basis-1/4">
                <div className="tooltip" data-tip={`${students} Enrolled`}>
                  <UserCircleIcon className="h-10 w-10 cursor-pointer stroke-green-500 mr-1" />
                </div>

                <div className="tooltip" data-tip="Edit Course">
                  <PencilSquareIcon
                    onClick={() =>
                      router.push(`/instructor/course/edit/${slug}`)
                    }
                    className="h-10 w-10 cursor-pointer stroke-yellow-500 mr-1"
                  />
                </div>

                {course.lessons && course.lessons.length < 5 ? (
                  <div
                    className="tooltip"
                    data-tip="Min 5 lessons required to publish"
                  >
                    <QuestionMarkCircleIcon className="h-10 w-10 cursor-pointer stroke-red-500" />
                  </div>
                ) : course.published ? (
                  <div className="tooltip" data-tip="Unpublished">
                    <XCircleIcon
                      onClick={(e) => handleUnpublish(e, course._id)}
                      className="h-10 w-10 cursor-pointer stroke-red-500 mr-1"
                    />
                  </div>
                ) : (
                  <div className="tooltip" data-tip="Publish">
                    <CheckIcon
                      onClick={(e) => handlePublish(e, course._id)}
                      className="h-10 w-10 cursor-pointer stroke-green-500 mr-1"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="divider"></div>

            <div className="mb-4">
              <ReactMarkdown children={course.description} />
            </div>

            <label
              htmlFor="addLesson-Modal"
              className="btn bg-blue-400 btn-block rounded-full modal-button text-center"
            >
              <a>
                <ArrowUpOnSquareIcon className=" w-8 mr-4" />
              </a>
              Add Lesson
            </label>

            <input
              type="checkbox"
              id="addLesson-Modal"
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="addLesson-Modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">+ Add Lesson</h3>
                <p className="py-4">
                  <AddLessonForm
                    values={values}
                    setValues={setValues}
                    handleAddLesson={handleAddLesson}
                    uploading={uploading}
                    uploadButtonText={uploadButtonText}
                    handleVideo={handleVideo}
                    progress={progress}
                    handleVideoRemove={handleVideoRemove}
                  />
                </p>
              </div>
            </div>

            <div className="">
              <div className="text-4xl font-bold">
                {course && course.lessons && course.lessons.length} Lessons
              </div>
              <List
                itemLayout="horizontal"
                dataSource={course && course.lessons}
                renderItem={(item, index) => (
                  <Item className="flex flex-row mb-4 border-b-2 border-gray-400 p-4">
                    <Item.Meta
                      className="bg-gray-400 text-2xl text-center text-white rounded-full w-10 h-10 mr-10"
                      avatar={<Avatar>{index + 1}</Avatar>}
                    ></Item.Meta>

                    <Item.Meta
                      className="text-3xl"
                      title={item.title}
                    ></Item.Meta>
                  </Item>
                )}
              ></List>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
