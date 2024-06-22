/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/share/Button";
import ModelComponent from "@/components/share/ModelComponent";
import Title from "@/components/share/Title";
import { Input, Table } from "antd";
import { CalendarCheck, ExternalLink, Filter, Search } from "lucide-react";
import { useState } from "react";
import { useBlockUserMutation, useGetAllUsersQuery } from "@/redux/apiSlices/userListApi";
import { imageUrl } from "@/redux/api/apiSlice";
import Swal from "sweetalert2";
import { GrClose } from "react-icons/gr";

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
  is_block: boolean,
  action: {
    sId: number,
    _id: string,
  },
}
const UserDetails = () => {
  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [openModel, setOpenModel] = useState(false);
  const [userData, setUserData] = useState({});
  const [type, setType] = useState("");
  const { data: usersData, refetch } = useGetAllUsersQuery(keyword)
  const [blockUser] = useBlockUserMutation()
  const data = usersData?.data?.map((item:usersData, index:number) => {
    return ({
      key: index + 1,
      image: item?.profile_image,
      name: item?.name,
      email: item?.email,
      plan_type: item?.plan_type,
      is_block: item?.is_block,
      action: {
        sId: index + 1,
        _id: item?._id,
      },
    })
  })
  
  const handleBlock=async(id: string)=>{
    console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#333434",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText : "No"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await blockUser(id).then((response)=>{
          console.log(response)
          if(response?.data?.statusCode === 200){
            Swal.fire({
              title: "Blocked!",
              text: "User has been Blocked.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              refetch()
            })
          }
        })
        
      }
    });
  }

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
      render: (_: any, data: any) => {
        console.log(data)
        return (
          <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleUser(data)}
            className="hover:bg-primary p-1 rounded bg-blue"
          >
            <ExternalLink />
          </button>
          <button  onClick={()=>handleBlock(data?.action?._id)} className={` ${ data?.is_block ? "bg-primary" : "bg-secondary"} px-3 py-1 rounded hover:bg-primary`}>
            Block
          </button>
        </div>
        )
      },
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
      <div className="flex justify-between items-center mb-6 px-4 pt-4 ">
        <Title className="text-white">User List</Title>
        <div className="flex items-center gap-3">
          <Input
            prefix={<Search color="#fff" />}
            style={{
              width: 300,
              background: "transparent",
              border: "1px solid #fff",
              height: 45,
              color: "#fff",
            }}
            onChange={(e)=>setKeyword(e.target.value)}
            value={keyword}
            suffix={<GrClose style={{display: keyword ? "block" : "none"}} onClick={()=>setKeyword("")} className="cursor-pointer" color="#fff" />}
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
          pageSize: 9,
          total: usersData?.meta?.total,
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
