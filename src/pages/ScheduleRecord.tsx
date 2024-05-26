/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/share/Button";
import ModelComponent from "@/components/share/ModelComponent";
import Title from "@/components/share/Title";
import { Input, Table } from "antd";
import { Edit, Filter, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import image from "../assets/article.png";

const data = [...Array(9).keys()].map((item, index) => ({
  sId: index + 1,
  meetingLink: "https://marketplace.zoom ...",
  password: "fads@456qg",
  time: "8:30pm",
  date: "25/05/2024",
  action: {
    sId: index + 1,
    image: <img src={image} className="w-9 h-9 rounded" alt="" />,
    name: "Fahim",
    email: "fahim@gmail.com",
    status: "active",
    dateOfBirth: "24-05-2024",
    contact: "0521545861520",
  },
}));

const ScheduleRecord = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [userData, setUserData] = useState({});
  const [type, setType] = useState("");
  const pageSize = 10;
  const columns = [
    {
      title: "S.ID",
      dataIndex: "sId",
      key: "sId",
    },
    {
      title: "Meeting Link",
      dataIndex: "meetingLink",
      key: "meetingLink",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => {
              setOpenModel(true);
              setType("schedule");
            }}
            className="text-gray-400"
          >
            <Edit />
          </button>
          <button className="text-red-500">
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  const handlePage = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Title>Meeting schedule record</Title>
      <div className="flex justify-end items-center mb-5 ">
        <div className="flex items-center gap-3">
          <Input
            prefix={<Search color="#fff" />}
            style={{
              background: "transparent",
              border: "1px solid #fff",
              height: 45,
              color: "#fff",
            }}
            placeholder="Search"
          />

          <Button
            className="bg-yellow text-gray-600"
            icon={<Filter size={20} />}
          >
            Filter
          </Button>
        </div>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize,
          total: 50,
          current: currentPage,
          onChange: handlePage,
        }}
        rowHoverable={false}
      />
      <ModelComponent
        openModel={openModel}
        setOpenModel={setOpenModel}
        data={userData}
        type={type}
      />
    </div>
  );
};

export default ScheduleRecord;
