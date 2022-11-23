import React from "react";
import { List, Avatar, Modal } from "antd";
const { Item } = List;

const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}) => {
  return (
    <div className="bg-slate-400">
      <div className="bg-slate-300">
        {lessons && (
          <div className=" font-bold text-3xl">{lessons.length} Lessons</div>
        )}
      </div>

      <div className="p-2 pl-6">
        <List
          itemLayout="horizontal"
          dataSource={lessons}
          renderItem={(item, index) => (
            <Item>
              <Item.Meta
                avatar={
                  <Avatar className="bg-slate-600">
                    <div className=" text-lg text-black font-bold">
                      {index + 1}
                    </div>
                  </Avatar>
                }
                title={<div className="text-lg">{item.title}</div>}
              />
              {item.video && item.video !== null && item.free_preview && (
                <a
                  className="text-black"
                  onClick={() => {
                    setPreview(item.video.Location);
                    setShowModal(!showModal);
                  }}
                >
                  <div>Preview Video ** add icon</div>
                </a>
              )}
            </Item>
          )}
        />
      </div>
    </div>
  );
};

export default SingleCourseLessons;
