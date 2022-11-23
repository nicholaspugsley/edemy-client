import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const UserIndex = () => {
  // context
  const {
    state: { user },
  } = useContext(Context);

  // state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // effect
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRoute>
      {loading && <ArrowPathIcon className="animate-spin" />}
      <div className="container min-h-screen bg-gray-200">
        <h1 className="text-center text-2xl text-white bg-primary">
          Student Dash
        </h1>

        {/* <pre className="text-xl">{JSON.stringify(courses, null, 4)}</pre> */}

        {/* SHOW LIST OF COURSES */}

        {courses &&
          courses.map((course) => (
            <div key={course._id} className="flex items-start">
              <Avatar
                size={100}
                shape="square"
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="flex-1 pl-4 bg-red-300">
                <Link href={`/user/course/${course.slug}`}>
                  <a>
                    <div className="text-2xl text-purple-500 font-bold">
                      {course.name}
                    </div>
                  </a>
                </Link>
                <p>{course.lessons.length} lessons</p>
                <p>By {course.instructor.name}</p>
              </div>
              <div className="flex-end bg-slate-300">
                <Link href={`/user/course/${course.slug}`}>
                  <a>
                    <ArrowPathIcon className="h-8 w-8" /> video player icon
                  </a>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </UserRoute>
  );
};

export default UserIndex;
