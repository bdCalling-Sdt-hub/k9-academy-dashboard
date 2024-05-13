/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/share/Button";
import ModelComponent from "@/components/share/ModelComponent";
import Title from "@/components/share/Title";
import { Input, Table } from "antd";
import { CalendarCheck, ExternalLink, Filter, Search } from "lucide-react";
import { useState } from "react";
import image from "../assets/user.jpg";

const data = [...Array(9).keys()].map((item, index) => ({
  sId: index + 1,
  image: <img src={image} className="w-9 h-9 rounded" alt="" />,
  name: "Fahim",
  email: "fahim@gmail.com",
  status: "active",
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

const UserDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [userData, setUserData] = useState({});
  const pageSize = 10;
  const columns = [
    {
      title: "S.ID",
      dataIndex: "sId",
      key: "sId",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleUser(data.action)}
            className="hover:bg-primary p-1 rounded bg-blue"
          >
            <ExternalLink />
          </button>
          <button className="bg-secondary px-3 py-1 rounded hover:bg-primary">
            Block
          </button>
        </div>
      ),
    },
  ];

  const handlePage = (page: any) => {
    setCurrentPage(page);
  };

  const handleUser = (values) => {
    setUserData(values);
    setOpenModel(true);
  };

  return (
    <div>
      <Title>User List</Title>
      <div className="flex justify-end items-center mb-5 ">
        <div className="flex items-center gap-3">
          <Input
            prefix={<Search />}
            className="w-4/4 h-12 bg-base border-0 text-primary placeholder:text-gray-200 hover:bg-primary hover:text-white"
            placeholder="Search"
          />
          <Button
            className="bg-blue text-gray-600"
            icon={<CalendarCheck size={20} />}
          >
            Schedule
          </Button>
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
      />
    </div>
  );
};

export default UserDetails;
