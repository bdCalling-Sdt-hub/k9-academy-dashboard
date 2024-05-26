import { Edit, Upload } from "lucide-react";
import { useState } from "react";

import { Button, Col, Form, Input, Row } from "antd";

const Profile = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const initialFormValues = {
    name: "Nadir on the go",
    email: "nadir@gmail.com",
    phoneNumber: "4651261025",
    dateOfBirth: "25-4-2003",
    location: "Banasree,Dahaka",
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };
  const src = imageUrl
    ? imageUrl
    : "https://i.ibb.co/cXq8yDY/destination-italiy-single3.jpg";

  return (
    <div className="w-2/4 mx-auto">
      <div className="text-center bg-base p-4 rounded mb-5">
        {!openEdit && (
          <div className="flex justify-end">
            <button className="text-blue" onClick={() => setOpenEdit(true)}>
              <Edit size={20} />
            </button>
          </div>
        )}
        <div>
          {openEdit ? (
            <div>
              <input
                type="file"
                className=" hidden"
                id="image"
                onChange={handleImage}
              />
              <label
                htmlFor="image"
                className="border flex justify-center items-center w-28 h-28 rounded-full  cursor-pointer mx-auto relative"
              >
                <img src={src} className="w-full h-full  rounded-full" alt="" />
                <div className="absolute">
                  <Upload size={30} color="#fff" />
                </div>
              </label>
            </div>
          ) : (
            <img
              src="https://i.ibb.co/cXq8yDY/destination-italiy-single3.jpg"
              alt=""
              className="w-28 h-28 rounded-full inline-block"
            />
          )}
        </div>
        <h2 className="text-2xl mt-2 text-white">Pirates</h2>
      </div>

      <div>
        {!openEdit ? (
          <Form layout="vertical" initialValues={initialFormValues}>
            <Row
              gutter={{
                xs: 8,

                lg: 15,
              }}
            >
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Name</div>}
                  name="name"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Email</div>}
                  name="email"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Phone number</div>}
                  name="phoneNumber"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Date of Birth</div>}
                  name="dateOfBirth"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={<div className="text-white">Location</div>}
                  name="location"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                    readOnly
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : (
          //edit section
          <Form
            layout="vertical"
            initialValues={initialFormValues}
            onFinish={onFinish}
          >
            <Row
              gutter={{
                xs: 8,
                lg: 15,
              }}
            >
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Name</div>}
                  name="name"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Email</div>}
                  name="email"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Phone Number</div>}
                  name="phoneNumber"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="text-white">Date of birth</div>}
                  name="dateOfBirth"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label={<div className="text-white">Location</div>}
                  name="location"
                >
                  <Input
                    size="large"
                    className="bg-transparent border text-white border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                className="bg-secondary h-10 text-lg"
                htmlType="submit"
              >
                Save changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Profile;
