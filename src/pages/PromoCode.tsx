import Title from "@/components/share/Title";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
const { Option } = Select;

const CreateForm = () => {
  const [option, setOption] = useState("CHECKBOX");

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className="p-6">
      <Title className="mb-10 text-white">Assign Promo Details</Title>
      <Form
        layout="vertical"
        style={{
          width: 478,
          margin: "0 auto",
          border: "1px solid #E5F4EF",
          borderRadius: 4,
          padding: 24,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label={<p className="text-white">Promo code</p>}
          rules={[
            {
              required: true,
              message: "Please Enter Title",
            },
          ]}
          name={"title"}
        >
          <Input
            placeholder="Enter Your Title"
            style={{
              background: "transparent",
              width: "100%",
              height: 50,
              border: "1px solid #E6E6E6",
              outline: "none",
            }}
          />
        </Form.Item>

        <Form.Item
          name={"options"}
          label={<p className="text-white">Promo descriptions</p>}
          rules={[
            {
              required: true,
              message: "Enter Select Options",
            },
          ]}
        >
          <Form.List name={"options"}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => {
                  return (
                    <Form.Item
                      required={false}
                      key={index}
                      className="w-full"
                      style={{ marginBottom: 0 }}
                    >
                      <div className="flex items-center mb-2 gap-[30px] w-full">
                        <Form.Item
                          name={field.name}
                          fieldKey={field.fieldKey}
                          validateTrigger={["onChange", "onBlur"]}
                          style={{ marginBottom: 0 }}
                          className="w-full"
                        >
                          <Input
                            style={{
                              width: "100%",
                              height: 45,
                              border: "1px solid #E7EBED",
                              background: "transparent",
                              borderRadius: "none",
                              outline: "none",
                              color: "#415D71",
                            }}
                            placeholder="Enter Options"
                            className="raleway-regular text-sm leading-5"
                          />
                        </Form.Item>
                        <div>
                          {fields.length > 0 ? (
                            <CiCircleMinus
                              size={30}
                              className="dynamic-delete-button cursor-pointer text-[#D7263D]"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </div>
                      </div>
                    </Form.Item>
                  );
                })}

                <Form.Item
                  style={{
                    width: "100%",
                    margin: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <GoPlusCircle size={30} color="#fff" onClick={() => add()} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item style={{ margin: 0 }}>
          <Button
            htmlType="submit"
            style={{
              background: "#DD1122",
              width: "100%",
              height: 48,
              border: "none",
              outline: "none",
              margin: "0 auto",
              color: "white",
              borderRadius: 8,
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateForm;
