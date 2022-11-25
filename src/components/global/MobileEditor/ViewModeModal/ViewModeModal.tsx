import Modal from "../../../lib/Modal/Modal";

export const ViewModeModal: React.FC = () => {
  return (
    <Modal>
      <div
        className="
          fixed top-0 left-0 bottom-0
          w-[100%] 
          bg-red-300
          m-4
        "
      >
        <h1>hello</h1>
      </div>
    </Modal>
  )
};

export default ViewModeModal;
