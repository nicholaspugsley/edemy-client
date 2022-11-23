import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  HomeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className="container text-center mx-auto space-x-4 ">
      <form onSubmit={handleAddLesson}>
        <div className="flex-row mb-2 ">
          <input
            type="text"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            value={values.title}
            placeholder="Title"
            autoFocus
            required
            className="w-full rounded"
          />
        </div>

        <div className="flex-row mb-2 ">
          <textarea
            rows={7}
            placeholder="Content"
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            className="textarea textarea-info w-full textarea-bordered "
            value={values.content}
          ></textarea>
        </div>

        <div className="flex-row mb-2">
          <label className="btn">
            {uploadButtonText}
            <input
              type="file"
              name="video"
              onChange={handleVideo}
              accept="video/*"
              hidden
            />
          </label>

          {!uploading && values.video.Location && (
            <div className="tooltip " data-tip="Remove Video">
              <button
                onClick={handleVideoRemove}
                className="badge badge-error ml-3 cursor-pointer"
              >
                X
              </button>
            </div>
          )}
        </div>

        <div className="flex-row mb-2">
          {progress > 0 && (
            <progress
              className="progress w-56"
              values={progress}
              max="100"
            ></progress>
          )}
        </div>

        <div className="flex flex-row  mb-2">
          <button
            onClick={handleAddLesson}
            loading={uploading}
            className="btn btn-block btn-primary rounded-full"
          >
            Save Lesson
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLessonForm;
