import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const InstructorIndex = () => {
  const [courses, setCourses] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  return (
    <InstructorRoute>
      <div className="container bg-gray-200 min-h-screen">
        {/* HEADER */}
        <div className="text-center py-4 px-4 md:py-16 md:px-8 mb-8 bg-purple-500 font-bold text-white">
          <h1 className="text-6xl">Instructor Dashboard</h1>
        </div>
        {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
        {courses &&
          courses.map((course) => (
            <>
              <div className="border-gray-400 border-b-2 ">
                <div className="flex flex-row space-x-8">
                  {/* ROW 1 */}
                  <div className="p-5 ">
                    <img
                      className="mask mask-circle h-24 w-24 "
                      src={course.image ? course.image.Location : "/course.png"}
                    />
                  </div>
                  {/* ROW 2 */}
                  <div className="space-y-0 p-5">
                    <Link
                      href={`/instructor/course/view/${course.slug}`}
                      className="cursor-pointer"
                    >
                      <a className="text-4xl mt-2 text-blue-600">
                        {course.name}
                      </a>
                    </Link>
                    <p className="">{course.lessons.length} Lessons</p>
                    {course.lessons.length < 5 ? (
                      <p className="text-warning">
                        At least 5 lessons are required
                      </p>
                    ) : course.published ? (
                      <p className="text-success">
                        Your course is live in the marketplace
                      </p>
                    ) : (
                      <p className="text-success">
                        Your course is ready to be published
                      </p>
                    )}
                  </div>

                  {/* ROW 3 */}
                  <div className="p-5">
                    {course.published ? (
                      <div className="tooltip" data-tip="Published">
                        <CheckIcon className="h-10 w-10 cursor-pointer" />
                      </div>
                    ) : (
                      <div className="tooltip" data-tip="Unpublished">
                        <XMarkIcon className="h-10 w-10 cursor-pointer" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </InstructorRoute>
  );
};

export default InstructorIndex;
