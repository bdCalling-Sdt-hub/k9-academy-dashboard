import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import {
  Bell,
  Boxes,
  CalendarCheck2,
  CircleAlert,
  Container,
  Database,
  Image,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Notebook,
  NotebookPen,
  Settings,
  ShieldPlus,
  ShieldQuestion,
  SquareMenu,
  User,
  User2,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    path: "/user-details",
    title: "User Details",
    icon: <User2 size={18} />,
  },
  {
    path: "/categories",
    title: "Promo/Package",
    icon: <SquareMenu size={18} color="#fff" />,
    subMenu: [
      {
        path: "/category",
        title: "Manage Promo",
        icon: <Container size={18} color="#fff" />,
      },
      {
        path: "/sub-category",
        title: "Manage Package",
        icon: <Boxes size={18} color="#fff" />,
      },
    ],
  },
  {
    path: "/create-offer",
    title: "Add Programs",
    icon: <CalendarCheck2 size={18} />,
  },
  {
    path: "/promo-code",
    title: "Training Articles",
    icon: <Notebook size={18} />,
  },
  {
    path: "/chat",
    title: "Chat",
    icon: <MessageCircle size={18} />,
  },

  {
    path: "/settings",
    title: "Settings",
    icon: <Settings size={18} color="#fff" />,
    subMenu: [
      {
        path: "/profile",
        title: "Sliders",
        icon: <Image size={18} color="#fff" />,
      },
      {
        path: "/terms-and-conditions",
        title: "Terms and Conditions",
        icon: <NotebookPen size={18} color="#fff" />,
      },
      {
        path: "/privacy-policy",
        title: "Privacy Policy",
        icon: <Database size={18} color="#fff" />,
      },
      {
        path: "/about",
        title: "About",
        icon: <CircleAlert size={18} color="#fff" />,
      },
      {
        path: "/faq",
        title: "FAQ",
        icon: <ShieldQuestion size={18} color="#fff" />,
      },
    ],
  },
  {
    path: "/make-admin",
    title: "Make Admin",
    icon: <ShieldPlus size={18} />,
  },
];

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const { SubMenu } = Menu;

const Dashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(pathname);

  const handleLogout = () => {
    navigate("/auth/login");
  };
  return (
    <Layout>
      <Sider
        width={300}
        className="sidebar-menu"
        style={{
          overflow: "auto",
          height: "100vh",
          zIndex: 2,
          backgroundColor: "#1E1E1E",
        }}
        trigger={null}
      >
        <img src={logo} alt="" className="mx-auto mb-8 mt-5 w-[150px]" />
        <Menu
          mode="inline"
          style={{ background: "#1E1E1E", color: "white" }}
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((item, index) =>
            item.subMenu ? (
              <SubMenu
                key={`sub-${index}`}
                icon={item.icon}
                style={{ color: "#fff", fontSize: "16px" }}
                title={item.title}
              >
                {item.subMenu.map((subItem, subIndex) => (
                  <Menu.Item
                    key={`sub-${index}-${subIndex}`}
                    icon={subItem.icon}
                    style={{
                      color: "#fff",
                      fontSize: "16px",
                      marginBottom: "10px",
                    }}
                  >
                    <Link to={`${item.path}${subItem.path}`}>
                      {subItem.title}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={`item-${index}`}
                icon={item.icon}
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  marginBottom: "10px",
                  // background: pathname === "/" ? "#DD1122" : "",
                }}
              >
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            )
          )}
          <Menu.Item
            key="500"
            className=""
            icon={<LogOut size={20} />}
            style={{ color: "#fff", fontSize: "16px" }}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#1E1E1E",
            height: "80px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div className="flex items-center gap-5">
            <Badge count={5}>
              <Bell size={30} color="#fff" />
            </Badge>
            <Popover placement="bottom" title="Hello" content={content}>
              <div className="flex items-center gap-2">
                <Avatar
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#DD1122",
                  }}
                  icon={<User size={25} />}
                />
                <h2 className="text-lg text-white">Mr.admin</h2>
              </div>
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            background: "#1e1e1ef7",
            height: `calc(100vh - 80px)`,
          }}
        >
          <div className=" h-[calc(100vh-100px)] m-2 rounded p-3 overflow-hidden">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
