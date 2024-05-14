import Title from "@/components/share/Title";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const PromoCode = () => {
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  return (
    <div>
      <Title>Assign Promo Details</Title>
      <div className="bg-base w-2/4 mx-auto p-4 rounded">
        <Form
          name="dynamic_form_item"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          layout="vertical"
        >
          <Form.Item name="promo" label="Promo Code">
            <Input className="h-12" placeholder="Write promo code" />
          </Form.Item>
          <Form.List name="facilities">
            {(fields, { add, remove }, { errors }) => (
              <>
                <Form.Item>
                  <Input className="h-12" placeholder="Facilities" />
                </Form.Item>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={index}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                    >
                      <Input className="h-12" placeholder="Facilities" />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  ></Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-secondary h-12 hover:bg-transparent"
            >
              Save & Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PromoCode;
