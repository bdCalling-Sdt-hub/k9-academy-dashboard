/* eslint-disable @typescript-eslint/no-explicit-any */
import SubcategoryModel from "@/components/Category/SubcategoryModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Table } from "antd";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";

const data = [...Array(50).keys()].map((index) => ({
  sNo: `${index + 1}`,
  packageName: "Gold",
  price: 500,
  action: "",
}));

const Packages = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const pageSize = 10;
  const columns = [
    {
      title: "S.NO",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Package Name",
      dataIndex: "packageName",
      key: "packageName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={showModal} className="text-white">
            <Edit />
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
      <Title>Packages</Title>
      <div className="flex justify-end items-center mb-10 mt-4">
        <Button onClick={showModal} icon={<Plus size={20} />}>
          Add Package
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowHoverable={false}
        pagination={{
          pageSize,
          total: 50,
          current: currentPage,
          onChange: handlePage,
        }}
      />
      <SubcategoryModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default Packages;
