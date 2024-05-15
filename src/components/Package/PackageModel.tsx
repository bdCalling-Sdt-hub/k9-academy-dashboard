import { Form, Input, Modal } from "antd";
import Button from "../share/Button";
const { TextArea } = Input;

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PackageModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (valeus: any) => {
    console.log(valeus);
  };

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

  return (
    <div>
      <Modal open={open} onCancel={handleCancel} footer={false}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label={<div className="text-white">Package Name</div>}>
            <Input
              placeholder="Enter package name"
              className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
            />
          </Form.Item>
          <Form.Item label={<div className="text-white">Package Price</div>}>
            <Input
              placeholder="Enter package price"
              className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
            />
          </Form.Item>
          <Form.Item
            label={
              <div className="text-white">
                Package Facilities(Write with '|' separator )
              </div>
            }
          >
            <TextArea
              showCount
              maxLength={100}
              onChange={onChange}
              placeholder="Write Facilities with '|' separator"
              className="h-32 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent placeholder:text-gray-500 text-white"
              style={{ color: "#fff" }}
            />
          </Form.Item>
        </Form>

        <Button className="px-10 mx-auto mt-5">Save</Button>
      </Modal>
    </div>
  );
};

export default PackageModel;
