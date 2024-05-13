import { Form, Input, Modal } from "antd";
import Button from "../share/Button";

interface OfferModelProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminModel: React.FC<OfferModelProps> = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (valeus: any) => {
    console.log(valeus);
  };

  return (
    <div>
      <Modal open={open} onCancel={handleCancel} footer={false}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label={<p className="text-white">Full Name</p>}
          >
            <Input
              placeholder="Enter full name"
              className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
              size="large"
            />
          </Form.Item>
          <Form.Item name="email" label={<p className="text-white">Email</p>}>
            <Input
              placeholder="Enter admin email"
              className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={<p className="text-white">Password</p>}
          >
            <Input.Password
              placeholder="Enter admin password"
              className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
              size="large"
              name="password"
            />
          </Form.Item>

          <Button className="px-10 mx-auto mt-5">Save</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminModel;
