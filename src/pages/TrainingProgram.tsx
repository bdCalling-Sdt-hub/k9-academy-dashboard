/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TrainingProgramModel from "@/components/TrainingProgram/TrainingProgramModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGetProgramQuery, useDeleteProgramMutation } from "@/redux/apiSlices/programApi";
import { imageUrl } from "@/redux/api/apiSlice";
import Swal from "sweetalert2";


const TrainingProgram = () => {
  const { data: programs, refetch } = useGetProgramQuery(undefined)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [deleteProgram] = useDeleteProgramMutation()

  const showModal = (values:any) => {
    setOpen(true);
    if(values?.id){
      setValue(values)
    }
  };

  const handleDeleteProgram = async(id:string)=>{
    try {
      await deleteProgram(id).unwrap().then((response)=>{
        console.log(response);
        if(response?.statusCode === 200){
          Swal.fire({
            title: "Updated!",
            text: response?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>{
            refetch()
          })
        }
      })
    } catch (error:any) {
      Swal.fire({
        title: "Deleted!",
        text: error.data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-10 mt-4">
        <Title className="text-white">All Training Program</Title>
        <Button onClick={()=>showModal(true)} icon={<Plus size={20} />}>
          Add Program
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-5">
        {programs?.data?.map((program:any, index:number) => (
          <div className="relative" key={index}>
            <figure className="bg-primary rounded-t-xl rounded-br-xl">
              <img
                style={{width : "100%", height: 150, objectFit: "cover"}}
                src={`${imageUrl}${program?.image}`}
                className="w-full  rounded-t-xl rounded-br-xl"
                alt=""
              />
              <figcaption className="text-gray-400 text-xl p-1">
                {program?.title}
              </figcaption>
            </figure>
            <div className="text-white flex flex-col-reverse items-center gap-2 absolute top-2 right-2">
              <Trash2 className="cursor-pointer" color="red" onClick={()=>handleDeleteProgram(program?._id)} />
            <button
              onClick={()=>showModal(program)}
              
            >
              <Edit />
            </button>
            </div>
          </div>
        ))}
      </div>
      <TrainingProgramModel refetch={refetch} value={value} setValue={setValue} open={open} setOpen={setOpen} />
    </div>
  );
};

export default TrainingProgram;
