/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from "antd";
import { Image, Video } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button";
const { TextArea } = Input;
const { Option } = Select;
import dayjs from 'dayjs';
import { imageUrl } from "@/redux/api/apiSlice";
import { useSendScheduleMutation } from "@/redux/apiSlices/userListApi";
import Swal from "sweetalert2";

interface IButtonProps{
  openModel: boolean;
  setOpenModel: (value: boolean) => void;
  data: any;
  type: string;
  title?: string;
  setUserData?: any;
  selectedUser?: string[];
}

const ModelComponent = ({ openModel, setOpenModel, data, type, title, setUserData, selectedUser }:IButtonProps ) => {
  const [ sendSchedule, {isLoading} ] = useSendScheduleMutation();


  const [form] = Form.useForm();
  form.setFieldsValue(undefined)
  const [imageURL, setImageUrl] = useState("");
  const { image, action, ...userData } = data;
  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  useEffect(()=>{
    if(userData){
      form.setFieldsValue({
        date: dayjs(userData.date),
        time: dayjs(userData.time, 'h:mm A'),
        password: userData?.password,
        meet_link: userData?.meet_link
      })
    }
  }, [form , userData])

  console.log(form.getFieldsValue())


  const hideModal = () => {
    setOpenModel(false);
    form.resetFields()
    setUserData({})
  };


  const onFinish = (values: any) => {
    console.log(values);
  };
  const onSchedule = async(values: any) => {
    const data = {
      ...values,
      users: selectedUser
    }
    
    await sendSchedule(data).then((response)=>{
      if(response?.data?.statusCode === 200){
        Swal.fire({
          title: "Sended",
          text: "Schedule is sended For Those User",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
          hideModal()
        })
      }
    })
  };
  const handleFaq = (values: any) => {
    console.log(values);
  };


  const onChange = (e:any) => {
    console.log("Change:", e.target.value);
  };
 
  const onGenderChange = (value:any) => {
    console.log("selected", value);
  };

  const onPanelChange = (value:any, mode:any) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  

  
  
  return (
    <div>
      <Modal
        title={<p className="text-[#F4F5F7] font-semibold text-xl mt-[4px]">{title}</p>}
        centered
        open={openModel}
        onOk={hideModal}
        onCancel={hideModal}
        footer={false}
        // headerStyle={{}}
        
      >
        {type === "user" && (
          <div className="mt-4">
            <div className="bg-blue w-full h-44 rounded flex justify-center items-center text-center mb-5 flex-col">
              {image && image?.includes('http') ? <img className="w-24 h-24 rounded-full" src={image} /> : <img className="w-24 h-24 rounded-full" src={`${imageUrl}${image}`} />}
              <p className="mt-2 text-xl text-center">{userData?.name}</p>
            </div>
            {Object.entries(userData).map(([field, value]) => {
              if (field == 'key') {
                return
              }
              return (
                <div key={field} className="mb-3">
                  <h2 className="text-xl font-normal text-blue capitalize">
                    {field}
                  </h2>
                  {/* @ts-ignore */}
                  <p>{value}</p>
                </div>
              )
            })}
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
                {imageURL ? (
                  <img
                    src={imageURL}
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
                {imageURL ? (
                  <img
                    src={imageURL}
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
          <Form onFinish={onSchedule} form={form} layout="vertical" className="schedule mt-4">
            
            <Form.Item
                            name="date"
                            style={{width: "100%"}}
                            label={<p className="text-[#F4F5F7] poppins text-[16px] leading-[27px] font-normal "> Date</p>}
                            rules={[
                                {
                                required: true,
                                message: "Please Select Future Date"
                                }
                            ]}
                            getValueFromEvent={(value: dayjs.Dayjs) => { return value ? value.format("YYYY-MM-DD") : ""}}
                            getValueProps={(value: dayjs.Dayjs) => {return { date: value }}}
                            
                            >
                            <DatePicker  style={{
                                background: "transparent",
                                border: "1px solid #C3C4C6"
                              }} className="h-12 w-full placeholder:text-gray-500 text-white" />
            </Form.Item>

            <Form.Item
                name="time"
                style={{width: "100%"}}
                label={<p className="text-[#F4F5F7] poppins text-[16px] leading-[27px] font-normal "> Time</p>}
                rules={[
                    {
                    required: true,
                    message: "Please Choose Your Pickup Time"
                    }
                ]}
                getValueFromEvent={(value: dayjs.Dayjs) => { return value ? value.format("h:mm A") : ""} }
                getValueProps={(value: dayjs.Dayjs) => { return { time: value } }}
            >
                <TimePicker  
                  
                  format={"h:mm:ss A"}
                  style={{
                    background: "transparent",
                    border: "1px solid #C3C4C6"
                  }}
                  
                  className="h-12 w-full bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 text-white"
                />
            </Form.Item>

            <Form.Item
              name="meet_link" 
              label={<div className="text-[#F4F5F7]">Link</div>}
              rules={[
                {
                required: true,
                message: "Please Enter Meet Link"
                }
              ]}
            >
              <Input
                style={{
                  background: "transparent",
                  border: "1px solid #C3C4C6"
                }}
                placeholder="Enter link"
                className="h-12  placeholder:text-gray-500 text-white"
              />
            </Form.Item>
            <Form.Item 
              name="password" 
              label={<div className="text-[#F4F5F7]">Password</div>}
              rules={[
                {
                required: true,
                message: "Please Enter Meet Link Password"
                }
              ]}
            >
              <Input
                style={{
                  background: "transparent",
                  border: "1px solid #C3C4C6"
                }}
                placeholder="Enter password"
                className="h-12  placeholder:text-gray-500 text-white"
              />
            </Form.Item>

            <Form.Item className="flex items-center justify-center w-full">
              <Button className="bg-[#00A2C1] w-[170px]">{isLoading ? "Sending..." : "Send Schedule"} </Button>
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
