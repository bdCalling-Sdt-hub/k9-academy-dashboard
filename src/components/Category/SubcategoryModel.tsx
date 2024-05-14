import { Form, Input, Modal } from "antd";
import { useState } from "react";
import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubcategoryModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [offer, setOffer] = useState("Foods");
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (valeus: any) => {
    console.log(valeus);
  };

  const handleOffer = (value: any) => {
    setOffer(value);
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
        </Form>

        <Button className="px-10 mx-auto mt-5">Save</Button>
      </Modal>
    </div>
  );
};

export default SubcategoryModel;
