import Title from "@/components/share/Title";
import { Select, Table } from "antd";
import { useState } from "react";
import image from "../assets/user.jpg";

const data = [...Array(10).keys()].map((item, index) => ({
  sId: index + 1,
  user: (
    <figure className="flex items-center gap-2">
      <img src={image} className="w-9 h-9 rounded" alt="" />
      <figcaption>Fahim</figcaption>
    </figure>
  ),
  package: "Gold",
  tId: "trx4574485541",
  startDate: "2024-10-25",
  endDate: "2025-10-25",
  payment: "$15",
}));

const PurchasedPackageList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const columns = [
    {
      title: "S.ID",
      dataIndex: "sId",
      key: "sId",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
    },
    {
      title: "T.ID",
      dataIndex: "tId",
      key: "tId",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Dime",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
  ];
  const handlePage = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-base rounded p-4 mt-2 ">
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <Title className="text-white mb-3">Purchased Package List</Title>
        <Select className="min-w-52 "
          placeholder='select plan ype'
          options={[
            { value: 'all', label: 'All' },
            { value: 'silver', label: 'Silver' },
            { value: 'gold', label: 'Gold' },
            { value: 'platinum', label: 'Platinum' },
          ]}
        >
        </Select>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowHoverable={false}
        bordered={false}
        pagination={{
          pageSize,
          total: 50,
          current: currentPage,
          onChange: handlePage,
        }}
      />
    </div>
  );
};

export default PurchasedPackageList;
