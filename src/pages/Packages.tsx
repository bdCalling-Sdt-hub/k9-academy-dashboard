/* eslint-disable @typescript-eslint/no-explicit-any */
import PackageModel from "@/components/Package/PackageModel";

import Title from "@/components/share/Title";
import { useGetAllPlanQuery } from "@/redux/apiSlices/plansApi";
import { Table } from "antd";
import { Edit } from "lucide-react";
import { useState } from "react";
const Packages = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const { data: plans } = useGetAllPlanQuery(undefined)
  console.log(plans)
  const showModal = () => {
    setOpen(true);
  };

  const data = plans?.data?.map((item: any, index: number) => {
    return ({
      sNo: `${index + 1}`,
      packageName: item?.title,
      price: item?.price,
      id: item?._id,
    })
  })
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
      render: (_: any, record: any) => (
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
    <div className="">
      <Title className="text-white px-4 pt-4 mb-6">Packages</Title>

      <Table
        dataSource={data}
        columns={columns}
        rowHoverable={false}
        pagination={{
          pageSize,
          total: 5,
          current: currentPage,
          onChange: handlePage,
        }}
      />
      <PackageModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default Packages;
