/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SliderModel from "@/components/Slider/SliderModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import image from "../assets/banner.png";

const data = [...Array(50).keys()].map((index) => ({
  sNo: index + 1,
  image: <img src={image} className="w-20" />,
  name: "Bidashi Dog",
  validityDate: "24-5-2024",
  action: "",
}));

const Slider = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const pageSize = 9;
  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
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

  return (
    <div>
      <Title>Sliders</Title>
      <div className="flex justify-end items-center mb-10 mt-4">
        <Button onClick={showModal} icon={<Plus size={20} />}>
          Add Cover
        </Button>
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
      <SliderModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default Slider;
