/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/share/Button";
import ModelComponent from "@/components/share/ModelComponent";
import Title from "@/components/share/Title";
import { Input, Spin, Table } from "antd";
import { Edit, Filter, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import image from "../assets/article.png";
import { useDeleteScheduleMutation, useGetScheduleQuery } from "@/redux/apiSlices/scheduleApi";
import moment from "moment";
import Swal from "sweetalert2";
import { GrClose } from "react-icons/gr";

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
  const [deleteAdmin] = useDeleteScheduleMutation();
  const [keyword, setKeyword] = useState("")
  const {data: schedules, isLoading, refetch } = useGetScheduleQuery({keyword, page:currentPage});
  const pageSize = 10;

  if(isLoading){
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Spin/>
      </div>
    )
  }

  const handleDelete=async(id: string)=>{
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
        await deleteAdmin(id).then((response)=>{
          console.log(response)
          if(response?.data?.statusCode === 200){
            Swal.fire({
              title: "Deleted!",
              text: "Schedule has been deleted.",
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
      dataIndex: "sId",
      key: "sId",
      render: (_:any, _record:any, index: number)=> (
        <p>{index + 1}</p>
      )
    },
    {
      title: "Meeting Link",
      dataIndex: "meet_link",
      key: "meet_link",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Time",
      dataIndex: "date",
      key: "date",
      render: (_:any, record:any)=> (
        <p>{record?.time}</p>
      )
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_:any, record:any)=> (
        <p>{record?.date}</p>
      )
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
              setUserData(data)
            }}
            className="text-gray-400"
          >
            <Edit />
          </button>
          <button onClick={()=>handleDelete(data?._id)} className="text-red-500">
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
      <div className="flex items-center justify-between mb-6 px-4 pt-4">
        <Title className="text-white">Meeting schedule record</Title>
        <Input
              prefix={<Search size={24} color="#fff" />}
              style={{
                width: 300,
                background: "transparent",
                border: "1px solid #fff",
                height: 45,
                color: "#fff",
              }}
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)}
              suffix={<GrClose style={{display: keyword ? "block" : "none"}} className="cursor-pointer" onClick={()=>setKeyword("")}  color="#fff" />}
              placeholder="Search by Date"
            />
      </div>
      <Table
        dataSource={schedules?.data}
        columns={columns}
        pagination={{
          
          total: schedules?.data?.meta?.total,
          current: currentPage,
          onChange: handlePage,
        }}
        rowHoverable={false}
      />
      <ModelComponent
        title="Edit Schedule"
        openModel={openModel}
        setOpenModel={setOpenModel}
        setUserData={setUserData}
        data={userData}
        type={type}
      />
    </div>
  );
};

export default ScheduleRecord;
