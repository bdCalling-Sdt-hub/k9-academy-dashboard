import Button from "@/components/share/Button";
import ModelComponent from "@/components/share/ModelComponent";
import Title from "@/components/share/Title";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const FAQPage = () => {
  const [openModel, setOpenModel] = useState(false);
  const questions = [
    {
      ques: "What is the meaning of FAQ?",
      ans: "Abbreviation of FAQ: Frequently ask question",
    },
    {
      ques: "How Does it work?",
      ans: "Simple way of work",
    },
    {
      ques: "Are your satisfied about our services?",
      ans: "Rating 8 out of 10",
    },
  ];
  const handleOpen = () => {
    setOpenModel(true);
  };
  return (
    <div>
      <Title className="text-white mb-6">FAQ</Title>
      <div className="flex justify-end mb-5">
        <Button onClick={handleOpen}>
          <Plus />
        </Button>
      </div>
      {questions.map((ques, index) => (
        <div className="bg-base mb-2 p-2 rounded">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-white">
              {index + 1}.{ques.ques}
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
          <p className="mt-2 text-lg bg-gray-500 rounded p-2">{ques.ans}</p>
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
