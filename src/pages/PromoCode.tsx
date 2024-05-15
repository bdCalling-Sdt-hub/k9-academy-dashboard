import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Form, Input } from "antd";
const { TextArea } = Input;

const PromoCode = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <div>
      <Title>Assign Promo Details</Title>
      <div className="bg-base w-2/4 mx-auto p-4 rounded">
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label={<div className="text-white">Promocode</div>}>
            <Input
              placeholder="Enter package name"
              className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
            />
          </Form.Item>

          <Form.Item
            label={
              <div className="text-white">
                Promo Facilities(Write with '|' separator )
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

          <Form.Item>
            <Button>Save and Changes</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PromoCode;
