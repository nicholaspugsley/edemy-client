import { useEffect, useState, createElement } from "react";
import StudentRoute from "../../../components/routes/StudentRoute";
import axios from "axios";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
//import Link from "next/link";
//import { Context } from "../../context";

// icons & styling
import { Button, Menu, Avatar } from "antd";
import "antd/dist/antd.css";
// import { PlayCircleOutlined } from "antd-design/icons";
import { ArrowPathIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] }); // course.lessons
  const [completedLessons, setCompletedLessons] = useState([]);

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    // console.log("COMPLETED LESSONS =>", data);
    setCompletedLessons(data);
  };

  const markCompleted = async () => {
    // console.log("SEND LESSON ID TO MARK AS COMPLETED");
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    console.log(data);
  };

  const markIncompleted = async () => {
    // console.log("SEND LESSON ID TO MARK AS COMPLETED");
    const { data } = await axios.post(`/api/mark-incomplete`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    console.log(data);
  };

  return (
    <StudentRoute>
      {/* CONATINER */}
      <div className="container">
        {/* LESSON MENU */}
        <div className="flex">
          <div className="flex-auto max-w-xs">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="btn gap=2"
            >
              {collapsed ? (
                <ArrowPathIcon className="h-6 w-6" />
              ) : (
                <ArrowPathIcon className="h-6 w-6" />
              )}{" "}
              {!collapsed && "Lessons"}
            </button>
            <div style={{ maxWidth: 280 }} className="">
              <Menu
                defaultSelectedKeys={[clicked]}
                inlineCollapsed={collapsed}
                style={{ height: "80vh" }}
              >
                {course.lessons.map((lesson, index) => (
                  <Menu.Item
                    onClick={() => setClicked(index)}
                    key={index}
                    icon={<Avatar>{index + 1}</Avatar>}
                  >
                    {lesson.title.substring(0, 30)}{" "}
                    {completedLessons.includes(lesson._id) ? (
                      <div class="badge badge-primary">Completed</div>
                    ) : (
                      <div class="badge badge-secondary">to be ...</div>
                    )}
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </div>

          {/* DISPLAY */}
          {/* <div className="flex">{JSON.stringify(clicked)}</div> */}
          <div className="flex-auto bg-blue-600">
            {clicked !== -1 ? (
              <>
                {/* <h1>{JSON.stringify(course.lessons[clicked])}</h1> */}
                {course.lessons[clicked].video &&
                  course.lessons[clicked].video.Location && (
                    <>
                      <div className="flex-auto">
                        <div className="text-2xl text-white">
                          {course.lessons[clicked].title.substring(0, 30)}
                        </div>
                        {completedLessons.includes(
                          course.lessons[clicked]._id
                        ) ? (
                          <span
                            className="text-xl text-white link cursor-pointer"
                            onClick={markIncompleted}
                          >
                            Mark as incomplete
                          </span>
                        ) : (
                          <span
                            className="text-xl text-white link cursor-pointer"
                            onClick={markCompleted}
                          >
                            Mark as completed
                          </span>
                        )}
                      </div>

                      <div className="h-96 w-3/4 p-2">
                        <ReactPlayer
                          className="react-player-div"
                          url={course.lessons[clicked].video.Location}
                          playing={false}
                          controls={true}
                          width="100%"
                          height="100%"
                          muted={true}
                        />
                      </div>

                      <div>
                        <ReactMarkdown
                          source={course.lessons[clicked].content}
                        />
                        <div className="text-lg">
                          Course content lorem epsum
                        </div>
                      </div>
                    </>
                  )}
              </>
            ) : (
              <>
                <div className="flex-auto mx-auto">
                  <div className="text-3xl ">
                    <VideoCameraIcon className="w-16 h-16" />
                  </div>
                  <div className="text-3xl text-center">
                    Clicked on the lesson to start learning
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
