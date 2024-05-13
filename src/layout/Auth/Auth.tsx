import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth-wrapper">
      <div className="h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
