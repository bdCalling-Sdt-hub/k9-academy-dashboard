import { Modal } from "antd";
import imagePic from "../../assets/user.jpg";

const ModelComponent = ({ openModel, setOpenModel, data }) => {
  console.log(data);
  const hideModal = () => {
    setOpenModel(false);
  };
  const { image, action, ...userData } = data;
  return (
    <div>
      <Modal
        open={openModel}
        onOk={hideModal}
        onCancel={hideModal}
        footer={false}
      >
        <div>
          <div className="bg-blue w-full h-44 rounded flex justify-center items-center text-center mb-5">
            <figure>
              <img src={imagePic} alt="" className="w-28 h-28 rounded-full" />
              <figcaption className="mt-2 text-xl">Fahim</figcaption>
            </figure>
          </div>
          {Object.entries(userData).map(([field, value]) => (
            <div key={field} className="mb-3">
              <h2 className="text-xl font-normal text-blue capitalize">
                {field}
              </h2>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ModelComponent;
