/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SliderModel from "@/components/Slider/SliderModel";
import UpdateModel from "@/components/Slider/UpdateModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { imageUrl } from "@/redux/api/apiSlice";
import {
  useDeleteSliderMutation,
  useGetSliderQuery,
} from "@/redux/apiSlices/settingApi";
import { Table } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Slider = () => {
  const { data, isLoading } = useGetSliderQuery(undefined);
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [type, setType] = useState("");
  const [deleteSlider, { isSuccess, isError, error }] =
    useDeleteSliderMutation();

  const showModal = () => {
    setOpen(true);
  };
  const updateModel = (data: any) => {
    setUpdateData(data);
    setOpen(true);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        Swal.fire({
          title: "Deleted successfully",
          text: "banner remove from the list",
          icon: "success",
          timer: 1500,
        });
        setOpen(false);
      }
    }
  }, [data, isSuccess, setOpen]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Failed to delete banner",
        text: error?.data?.message,
        icon: "error",
      });
    }
  }, [error?.data?.message, isError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_: any, data: any) => (
        <img
          src={`${imageUrl}${data.image}`}
          alt=""
          style={{ width: "200px" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={() => updateModel(data)} className="text-gray-400">
            <Edit />
          </button>
          <button
            className="text-red-500"
            onClick={() => deleteSlider(data._id)}
          >
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Title>Sliders</Title>
      <div className="flex justify-end items-center mb-10 mt-4">
        <Button onClick={showModal} icon={<Plus size={20} />}>
          Add Cover
        </Button>
      </div>
      <Table
        dataSource={data?.data}
        columns={columns}
        pagination={false}
        rowHoverable={false}
      />
      <SliderModel open={open} setOpen={setOpen} />
      <UpdateModel open={open} setOpen={setOpen} data={updateData} />
    </div>
  );
};

export default Slider;
