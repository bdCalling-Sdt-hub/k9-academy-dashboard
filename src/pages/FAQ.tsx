import Button from "@/components/share/Button";
import ModelComponent from "@/components/share/ModelComponent";
import Title from "@/components/share/Title";
import { useGetFaqQuery, usePostFaqMutation } from "@/redux/apiSlices/settingApi";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
interface Faq {
  _id: string,
  question: string,
  answer:string,
  createdAt: string,
  updatedAt: string,
  __v: 0,
  id: string,
}
const FAQPage = () => {
  const [openModel, setOpenModel] = useState(false);
  const { data } = useGetFaqQuery(undefined)
  const handleOpen = () => {
    setOpenModel(true);
  };
  return (
    <div className="p-6 rounded-md">
      <div className="flex justify-between items-center mb-6">
      <Title className="text-white mb-6">FAQ</Title>
        <Button onClick={handleOpen}>
          <Plus /> FAQ
        </Button>
      </div>
      {data?.data.map((ques:Faq, index:number) => (
        <div key={ques?._id} className="bg-base mb-2 p-2 rounded">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">
              {index + 1}.{ques?.question}
            </h2>
            <div className="flex items-center gap-2 justify-end">
              <button className="text-white">
                <Edit onClick={handleOpen} size={20} />
              </button>
              <button className="text-red-500">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <p className="mt-2 text-lg bg-gray-500 rounded p-2">{ques?.answer}</p>
        </div>
      ))}
      <ModelComponent
        openModel={openModel}
        setOpenModel={setOpenModel}
        type="faq"
        data={""}
      />
    </div>
  );
};

export default FAQPage;
