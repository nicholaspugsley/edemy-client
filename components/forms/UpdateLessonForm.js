import React from "react";
import ReactPlayer from "react-player";

import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  HomeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploading,
  uploadVideoButtonText,
  handleVideo,
  progress,
}) => {
  return (
    <div className="container text-center mx-auto space-x-4 ">
      {/* {JSON.stringify(current)} */}
      <form onSubmit={handleUpdateLesson}>
        <div className="flex-row mb-2 ">
          <div>Lesson Title</div>
          <input
            type="text"
            onChange={(e) => setCurrent({ ...current, title: e.target.value })}
            value={current.title}
            autoFocus
            required
            className="w-full rounded"
          />
        </div>

        <div className="flex-row mb-2 ">
          <div>Lesson Content & Description</div>
          <textarea
            rows={7}
            onChange={(e) =>
              setCurrent({ ...current, content: e.target.value })
            }
            className="textarea textarea-info w-full textarea-bordered "
            value={current.content}
          ></textarea>
        </div>

        <div>
          {!uploading && current.video && current.video.Location && (
            <div className="pt-2 flex justify-center">
              <ReactPlayer
                url={current.video.Location}
                width="410px"
                height="240px"
                controls
              />
            </div>
          )}
          <label className="btn">
            {uploadVideoButtonText}
            <input
              type="file"
              name="video"
              onChange={handleVideo}
              accept="video/*"
              hidden
            />
          </label>
        </div>

        <div className="flex-row mb-2">
          {progress > 0 && (
            <progress
              className="progress w-56"
              value={progress}
              max="100"
            ></progress>
          )}
        </div>

        <div className="flex-row justify-between">
          <div>Will you be showing this video as a preview?</div>
          <span className="pt-3 inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded">
            Preview
          </span>
          <input
            type="checkbox"
            className="toggle"
            name="free_preview"
            disabled={uploading}
            defaultChecked={current.free_preview}
            onChange={(c) => setCurrent({ ...current, free_preview: c })}
          />
        </div>

        <div className=" flex-row  mb-2">
          <button
            onClick={handleUpdateLesson}
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

export default UpdateLessonForm;
