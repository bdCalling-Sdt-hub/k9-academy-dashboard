const Notification = () => {
  const notifications = [
    {
      message: "You get message from client",
      date: "2 days ago",
    },
    {
      message: "You get message from client",
      date: "2 days ago",
    },
    {
      message: "You get message from client",
      date: "2 days ago",
    },
    {
      message: "You get message from client",
      date: "2 days ago",
    },
    {
      message: "You get message from client",
      date: "2 days ago",
    },
    {
      message: "You get message from client",
      date: "2 days ago",
    },
    {
      message: "You get message from client",
      date: "2 days ago",
    },
    {
      message: "You get message from client",
      date: "2 days ago",
    },
    {
      message: "You get message from client",
      date: "2 days ago",
    },
  ];
  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} className="text-white bg-base p-4 m-2 rounded">
          <p className="text-md">{notification.message}</p>
          <p className="text-gray-500 text-sm">{notification.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
