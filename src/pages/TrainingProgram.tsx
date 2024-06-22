/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TrainingProgramModel from "@/components/TrainingProgram/TrainingProgramModel";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import img1 from "../assets/dog1.png";
import img2 from "../assets/dog2.png";
import img3 from "../assets/dog3.png";
import { useGetAllProgramQuery } from "@/redux/apiSlices/programs";
import { imageUrl } from "@/redux/api/apiSlice";

const programLists = [
  {
    programName: "Puppy Imprinting",
    image: img1,
  },
  {
    programName: "Foundations Program",
    image: img2,
  },
  {
    programName: "Advanced Training",
    image: img3,
  },
  {
    programName: "Puppy Imprinting",
    image: img1,
  },
  {
    programName: "Foundations Program",
    image: img2,
  },
  {
    programName: "Advanced Training",
    image: img3,
  },
];
interface Programs {
  _id: string,
  title: string,
  image: string,
  createdAt: string,
  updatedAt: string,
  id: string,
}
const TrainingProgram = () => {
  const { data } = useGetAllProgramQuery(undefined)
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  return (
    <div className="p-6 rounded-md">
      <div className="flex justify-between items-center mb-6 mt-4">
        <Title className="text-white">All Training Program</Title>
        <Button onClick={showModal} icon={<Plus size={20} />}>
          Add Program
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-5">
        {data?.data.map((program: Programs) => (
          <div className="relative">
            <figure className="bg-primary rounded-t-xl rounded-br-xl">
              <img
                src={program?.image?.includes('http') ? program?.image : `${imageUrl}${program?.image}`}
                className="w-full  rounded-t-xl rounded-br-xl"
                alt=""
              />
              <figcaption className="text-gray-400 text-xl p-1">
                {program.title}
              </figcaption>
            </figure>
            <button
              onClick={showModal}
              className="text-white absolute top-2 right-2"
            >
              <Edit />
            </button>
          </div>
        ))}
      </div>
      <TrainingProgramModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default TrainingProgram;
