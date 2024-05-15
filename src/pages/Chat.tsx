/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera, SendHorizontal } from "lucide-react";
import image from "../assets/user.jpg";

const data = [...Array(15).keys()].map((item, index) => ({
  sId: index + 1,
  image: <img src={image} className="w-9 h-9 rounded" alt="" />,
  name: "Fahim",
  email: "fahim@gmail.com",
  status: "active",
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

const messageList = [
  {
    senderId: 1,
    message: "Hello",
  },
  {
    senderId: 2,
    message: "Yeah! how can i assist you?",
  },
  {
    senderId: 1,
    message: "How are you?",
  },
  {
    senderId: 1,
    message: "Thank you for your response.",
  },
  {
    senderId: 2,
    message: "No problem",
  },
  {
    senderId: 2,
    message: "It's my pleasure",
  },
  {
    senderId: 1,
    message: "Thank you again!",
  },
  {
    senderId: 2,
    message: "Whats your problem?",
  },
  {
    senderId: 1,
    message: "I need your help.",
  },
  {
    senderId: 1,
    message: "I think that will be easy for you.",
  },
  {
    senderId: 2,
    message: "Wow, That's great!",
  },
  {
    senderId: 1,
    message: "Tell your name?",
  },
  {
    senderId: 2,
    message: "My name is Fahim",
  },
  {
    senderId: 1,
    message: "It's nice name",
  },
  {
    senderId: 1,
    message: "Thank you",
  },
  {
    senderId: 1,
    message: "Welcome",
  },
];

const Chat = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-3">
        <div className="bg-primary col-span-3 h-[100vh] rounded overflow-auto p-4">
          {data.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-base mb-1 p-2 rounded hover:bg-blue cursor-pointer duration-100"
            >
              <img src={image} className="w-14 h-14 rounded-full" alt="" />
              <div>
                <div className="flex items-center gap-2">
                  {" "}
                  <h2 className="text-lg text-white">{user.name}</h2>
                  <span className="text-blue">2:45</span>
                </div>
                <p className="text-gray-400">Welcome to durdanto</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-primary col-span-9 h-[100vh] rounded">
          <div className="h-[calc(90vh-68px)] overflow-y-scroll p-4 flex flex-col gap-2 text-white">
            {messageList.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.senderId !== 1 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`${
                    message.senderId !== 1
                      ? "bg-secondary rounded-xl rounded-bl-none text-left"
                      : "bg-blue rounded-xl rounded-br-none text-right"
                  } p-4`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-white p-1 rounded-md">
            <input
              type="text"
              className="w-full border-0 outline-0 rounded-md h-12 p-2"
              placeholder="Enter message"
            />
            <input type="file" className="hidden" id="image" />
            <label
              htmlFor="image"
              className="bg-blue text-white p-2 rounded-md"
            >
              <Camera />
            </label>
            <button className="bg-secondary text-white px-5 py-2 rounded-md">
              <SendHorizontal />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
