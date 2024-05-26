/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/share/Button";
import ModelComponent from "@/components/share/ModelComponent";
import Title from "@/components/share/Title";
import { Input, Table } from "antd";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import image from "../assets/article.png";

const data = [...Array(9).keys()].map((item, index) => ({
  sId: index + 1,
  image: <img src={image} className="w-9 h-9 rounded" alt="" />,
  titleName: "Dog e-collar training",
  trainingProgram: "Puppy Imprinting",
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

const TrainingArticle = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
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
      title: "Title Name",
      dataIndex: "titleName",
      key: "titleName",
    },
    {
      title: "Training Program",
      dataIndex: "trainingProgram",
      key: "trainingProgram",
    },

    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={showModal} className="text-gray-400">
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

  const showModal = () => {
    setOpenModel(true);
  };

  return (
    <div>
      <Title>Article List</Title>
      <div className="flex justify-end items-center mb-5 ">
        <div className="flex items-center gap-3">
          <Input
            prefix={<Search color="#fff" />}
            className="w-4/4 h-12 bg-base border-0 text-primary placeholder:text-gray-200 hover:bg-primary hover:text-white"
            placeholder="Search"
          />

          <Button
            onClick={showModal}
            className="w-44"
            icon={<Plus size={20} />}
          >
            Add article
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
        data={""}
        type="article"
      />
    </div>
  );
};

export default TrainingArticle;
