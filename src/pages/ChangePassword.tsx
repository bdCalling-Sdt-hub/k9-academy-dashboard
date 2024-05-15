import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Form, Input } from "antd";
const { TextArea } = Input;

const ChangePassword = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div>
      <Title>Changes password</Title>
      <div className="bg-base w-2/4 mx-auto p-4 rounded">
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label={<div className="text-white">Current password</div>}>
            <Input
              placeholder="Enter current password"
              className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
            />
          </Form.Item>
          <Form.Item label={<div className="text-white">New password</div>}>
            <Input
              placeholder="Enter new password"
              className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
            />
          </Form.Item>
          <Form.Item label={<div className="text-white">Confirm password</div>}>
            <Input
              placeholder="Enter confirm password"
              className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
            />
          </Form.Item>

          <Form.Item>
            <Button>Save Changes</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
