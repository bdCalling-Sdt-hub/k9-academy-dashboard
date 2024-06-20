/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/share/Button";
import ModelComponent from "@/components/share/ModelComponent";
import Title from "@/components/share/Title";
import { Input, Table } from "antd";
import { CalendarCheck, ExternalLink, Filter, Search } from "lucide-react";
import { useState } from "react";
import { useGetAllUsersQuery } from "@/redux/apiSlices/userListApi";
import { imageUrl } from "@/redux/api/apiSlice";

interface usersData {
    isSubscribed: boolean,
    _id: string,
    name: string,
    email: string,
    phone_number: string,
    role: string,
    profile_image:string,
    cover_image:string,
    isPaid: boolean,
    activationCode: string,
    is_block: boolean,
    isActive: boolean,
    plan_type: string,
    expirationTime:string,
    createdAt: string,
    updatedAt:string,
    conversationId: string,
    id: string,
}
interface records {
  key: number,
  image: string,
  name: string,
  email: string,
  plan_type: string,
  action: {
    sId: number,
    _id: string,
  },
}
const UserDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [userData, setUserData] = useState({});
  const [type, setType] = useState("");
  const { data: usersData } = useGetAllUsersQuery(undefined)
  const data = usersData?.data?.map((item:usersData, index:number) => {
    return ({
      key: index + 1,
      image: item?.profile_image,
      name: item?.name,
      email: item?.email,
      plan_type: item?.plan_type,
      action: {
        sId: index + 1,
        _id: item?._id,
      },
    })
  })
  const pageSize = 9;
  const columns = [
    {
      title: "S.ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_:any, record:records) => {
        return (<div>
          {record.image && record?.image?.includes('http') ? <img className="w-10 h-10 rounded-full" src={record?.image} /> : <img className="w-10 h-10 rounded-full" src={`${imageUrl}${record?.image}`} />}
        </div>)
      }
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
      title: "Plan Type",
      dataIndex: "plan_type",
      key: "plan_type",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleUser(data)}
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

  const handleUser = (values:records) => {
    setUserData(values);
    setOpenModel(true);
    setType("user");
  };

  const rowSelection = {
    onChange: (selectedRowKeys:number, selectedRows:records[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`,"selectedRows: ",selectedRows);
    },
  };

  return (
    <div>
      <Title>User List</Title>
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
            className="bg-blue text-gray-600"
            onClick={() => {
              setOpenModel(true);
              setType("schedule");
            }}
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
        columns={columns}
        //@ts-ignore
        rowSelection={{
          ...rowSelection,
        }}
        dataSource={data || []}
        rowHoverable={false}
        pagination={{
          pageSize,
          total: 50,
          current: currentPage,
          onChange: handlePage,
        }}
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

export default UserDetails;
