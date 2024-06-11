import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import { useGetPrivacyPolicyQuery } from "@/redux/apiSlices/settingApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const { data, isLoading, isError, error } =
    useGetPrivacyPolicyQuery(undefined);

  console.log(data);
  console.log(error);

  useEffect(() => {
    setContent(data?.data?.description);
  }, [data?.data?.description]);

  const handleSubmit = () => {
    console.log(content);
  };
  return (
    <div className="container">
      <Title className="mb-4">Privacy Policy</Title>
      <JoditEditor
        ref={editor}
        value={content}
        config={{ height: 600 }}
        onBlur={(newContent) => setContent(newContent)}
      />
      <div className="flex justify-end mt-5" onClick={handleSubmit}>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
