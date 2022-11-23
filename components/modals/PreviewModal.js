import { Modal } from "antd";
import ReactPlayer from "react-player";

const PreviewModal = ({ showModal, setShowModal, preview }) => {
  return (
    <>
      <Modal
        visible={showModal}
        title="Course Preview"
        onCancel={() => setShowModal(!showModal)}
        width={720}
        footer={null}
        centered={true}
        destroyOnClose={true}
      >
        <div className="wrapper">
          <ReactPlayer
            url={preview}
            playing={showModal}
            controls={true}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
