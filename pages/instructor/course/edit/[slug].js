import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";
// ANTD
import { List, Avatar, Modal } from "antd";

const { Item } = List;

const CourseEdit = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  // state for lessons update
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("Upload Video");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    // console.log(data);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);

        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async (e) => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image remove failed. Try again later");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(values);
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast("Course Updated!!! Money Bitch");
      // router.push("/instructor");
    } catch (err) {
      toast(err.response.data);
    }
  };

  const handleDrag = (e, index) => {
    // console.log("ON DRAG =>", index);
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    // console.log("ON DROP =>", index);

    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;

    let movingItem = allLessons[movingItemIndex]; // clicked/dragged item to re-order
    allLessons.splice(movingItemIndex, 1); // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); // push item after target

    setValues({ ...values, lessons: [...allLessons] });
    // save the new lessons order in db
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });
    console.log("LESSONS REARRANGED RES => ", data);
    toast("Lessons rearranged successfully");
  };

  const handleDelete = async (index) => {
    // const answer = window.prompt("Are you sure you want to delete?");
    const answer = window.confirm("Are you sure you want to delete?");
    if (!answer) return;
    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    // console.log("removed", removed[0]._id);
    setValues({ ...values, lessons: allLessons });
    // send request to server
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log("LESSON DELETED =>", data);
  };

  /////////////////////////////
  // lesson update functions //
  /////////////////////////////

  const handleVideo = async () => {
    // rmove prveious video
    if (current.video && current.video.Loaction) {
      const res = await axios.post(
        `/api/course/video/${values.instructor._id}`,
        current.video
      );
      console.log("REMOVED ===>", res);
    }
    // upload
    const file = e.target.files[0];
    setUploadVideoButtonText(file.name);
    setUploading(true);
    // send video as form data
    const videoData = new FormData();
    videoData.append("video", file);
    videoData.append("courseId", values._id);
    // save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(MAth.round((100 * e.loaded) / e.total)),
      }
    );
    console.log(data);
    setCurrent({ ...current, video: data });
  };

  const handleUpdateLesson = async (e) => {
    // console.log("handle update lesson");
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload Video");
    setVisible(false);

    // update ui
    if (data.ok) {
      let arr = values.lessons;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, lessons: arr });
      toast("Lesson updated");
    }
  };

  return (
    <InstructorRoute>
      <div className="">
        {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
        <div className="text-center py-4 px-4 md:py-16 md:px-8 mb-8 bg-purple-500 font-bold text-white">
          <h1 className="text-6xl">Update Course</h1>
          <p className="text-3xl py-5"></p>
        </div>
        <div>
          <div className="bg-green-300">
            <CourseCreateForm
              handleSubmit={handleSubmit}
              handleImageRemove={handleImageRemove}
              handleImage={handleImage}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              preview={preview}
              uploadButtonText={uploadButtonText}
              editPage={true}
            />
          </div>

          {/* <div>
          <pre>{JSON.stringify(values, null, 4)}</pre>
        </div>
        <div>
          <pre>{JSON.stringify(image, null, 4)}</pre>
        </div> */}
        </div>

        <div className="divider"></div>

        <div className="min-w-full">
          <div className="text-4xl font-bold">
            {values && values.lessons && values.lessons.length} Lessons
          </div>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <List.Item
                className="flex flex-row mb-4 border-b-2 border-gray-400 p-4 modal-btn"
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="columns-1">
                  <div className="bg-gray-400 text-2xl text-center text-white rounded-full w-10 h-10 mr-10">
                    <List.Item.Meta avatar={<Avatar>{index + 1}</Avatar>} />
                  </div>
                </div>
                <div className="columns-2">
                  <div className="text-3xl">
                    <List.Item.Meta title={item.title} />
                  </div>
                </div>

                <div className="columns-3">
                  <label
                    className="btn modal-button bg-green-300"
                    htmlFor="updatemodal"
                    onClick={() => {
                      setVisible(true);
                      setCurrent(item);
                    }}
                  >
                    Update
                    <ArrowPathIcon className="h-6 w-6 stroke-white" />
                  </label>
                </div>

                <div className="columns-4">
                  <div
                    className="btn bg-red-300"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                    <TrashIcon className="h-6 w-6 stroke-white" />
                  </div>
                </div>
              </List.Item>
            )}
          ></List>
        </div>
      </div>

      {/* UPDATE MODAL */}

      <input type="checkbox" id="updatemodal" className="modal-toggle " />
      <div className="modal ">
        <div className="modal-box relative ">
          <label
            htmlFor="updatemodal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setVisible(false)}
          >
            ✕
          </label>
          <UpdateLessonForm
            current={current}
            setCurrent={setCurrent}
            handle={handleVideo}
            handleUpdateLesson={handleUpdateLesson}
            uploadVideoButtonText={uploadVideoButtonText}
            progress={progress}
            uploading={uploading}
          />
          {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
        </div>
      </div>

      {/* <Modal
        title="Update lesson"
        // open={visible}
        onCancel={() => setVisible(false)}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handle={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          progress={progress}
          uploading={uploading}
        />
        {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
      {/* </Modal> */}
    </InstructorRoute>
  );
};

export default CourseEdit;
