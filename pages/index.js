import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";
import { useRouter } from "next/router";

const Index = ({ courses }) => {
  const router = useRouter();
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
  //   fetchCourses();
  // }, []);

  return (
    <>
      <h1 className="text-center text-2xl text-white bg-primary">
        Online Education Marketplace
      </h1>
      <div className="container m-4">
        <div className="columns-3">
          {courses.map((course) => (
            <div key={course._id} className="">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);

  return {
    props: { courses: data },
  };
}

export default Index;
