import { Calendar, Col, Form, Input, Modal, Row, Select } from "antd";
import { Image, Video } from "lucide-react";
import { useState } from "react";
import imagePic from "../../assets/user.jpg";
import Button from "./Button";
const { TextArea } = Input;
const { Option } = Select;

const ModelComponent = ({ openModel, setOpenModel, data, type }) => {
  const [imageUrl, setImageUrl] = useState("");
  console.log(data);
  const { image, action, ...userData } = data;
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };
  const hideModal = () => {
    setOpenModel(false);
  };
  const onFinish = (valeus: any) => {
    console.log(valeus);
  };
  const onSchedule = (valeus: any) => {
    console.log(valeus);
  };
  const handleFaq = (valeus: any) => {
    console.log(valeus);
  };
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  const onGenderChange = (value) => {
    console.log("selected", value);
  };
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  return (
    <div>
      <Modal
        open={openModel}
        onOk={hideModal}
        onCancel={hideModal}
        footer={false}
      >
        {type === "user" && (
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
        )}
        {type === "article" && (
          <div>
            <div className="mb-4">
              <h2 className="text-md mb-2">Programs article thumbnail</h2>
              <input
                type="file"
                className=" hidden"
                id="image"
                onChange={handleImage}
              />
              <label
                htmlFor="image"
                className="w-full border rounded flex justify-center items-center h-24 cursor-pointer"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className="w-full h-full object-cover rounded"
                    alt=""
                  />
                ) : (
                  <Image size={30} />
                )}
              </label>
            </div>
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item
                label={<div className="text-white">Program article title</div>}
              >
                <Input
                  placeholder="Enter package name"
                  className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                />
              </Form.Item>

              <Row gutter={10}>
                <Col span={12}>
                  <Form.Item
                    label={<div className="text-white">Training Program</div>}
                  >
                    <Select
                      placeholder="Select Program"
                      onChange={onGenderChange}
                      allowClear
                      className="h-12 bg-primary"
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<div className="text-white">Article Name</div>}
                  >
                    <Input
                      placeholder="Enter package name"
                      className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label={<div className="text-white">Article Details</div>}
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
            <div>
              <h2 className="text-md mb-2">Article video</h2>
              <input
                type="file"
                className=" hidden"
                id="image"
                onChange={handleImage}
              />
              <label
                htmlFor="image"
                className="w-full border rounded flex justify-center items-center h-24 cursor-pointer"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    className="w-full h-full object-cover rounded"
                    alt=""
                  />
                ) : (
                  <Video size={30} />
                )}
              </label>
            </div>
            <Button className="px-10 mx-auto mt-5">Save</Button>
          </div>
        )}
        {type === "schedule" && (
          <Form onFinish={onSchedule} layout="vertical">
            <Form.Item label={<div className="text-white">Date</div>}>
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </Form.Item>
            <Form.Item label={<div className="text-white">Link</div>}>
              <Input
                placeholder="Enter link"
                className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
              />
            </Form.Item>
            <Form.Item label={<div className="text-white">Password</div>}>
              <Input
                placeholder="Enter password"
                className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
              />
            </Form.Item>

            <Form.Item>
              <Button>Save Changes</Button>
            </Form.Item>
          </Form>
        )}
        {type === "faq" && (
          <Form onFinish={handleFaq} layout="vertical">
            <Form.Item label={<div className="text-white">Question</div>}>
              <Input
                placeholder="Enter question here"
                className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
              />
            </Form.Item>
            <Form.Item label={<div className="text-white">Answer</div>}>
              <TextArea
                placeholder="Enter answer here"
                rows={10}
                className=" bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
              />
            </Form.Item>

            <Form.Item>
              <Button>Save Changes</Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ModelComponent;
