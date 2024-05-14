import Auth from "@/layout/Auth/Auth";
import Dashboard from "@/layout/Dasboard/Dashboard";
import About from "@/pages/About";
import AddProduct from "@/pages/AddProduct";

import ChangePassword from "@/pages/ChangePassword";
import Chat from "@/pages/Chat";
import CoverPage from "@/pages/CoverPage";
import CreateOffer from "@/pages/CreateOffer";
import DashboardHome from "@/pages/DashboardHome";
import FAQPage from "@/pages/FAQ";
import ForgetPassword from "@/pages/ForgetPassword";
import Login from "@/pages/Login";
import MakeAdmin from "@/pages/MakeAdmin";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Profile from "@/pages/Profile";

import SetNewPassword from "@/pages/SetNewPassword";
import Settings from "@/pages/Settings";
import UserDetails from "@/pages/UserDetails";

import Packages from "@/pages/Packages";
import PromoCode from "@/pages/PromoCode";
import TermsAndCondition from "@/pages/TermsAndCondition";
import UserManagement from "@/pages/UserManagement";
import VerifyEmail from "@/pages/VerifyEmail";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/user-details",
        element: <UserDetails />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },

      {
        path: "/user-management",
        element: <UserManagement />,
      },
      {
        path: "/manages/promo-code",
        element: <PromoCode />,
      },
      {
        path: "/manages/packages",
        element: <Packages />,
      },
      {
        path: "/create-offer",
        element: <CreateOffer />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/make-admin",
        element: <MakeAdmin />,
      },
      {
        path: "/cover",
        element: <CoverPage />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/settings/terms-and-conditions",
        element: <TermsAndCondition />,
      },
      {
        path: "/settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/settings/about",
        element: <About />,
      },
      {
        path: "/settings/faq",
        element: <FAQPage />,
      },
      {
        path: "/settings/profile",
        element: <Profile />,
      },
      {
        path: "/settings/change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/auth/verify",
        element: <VerifyEmail />,
      },
      {
        path: "/auth/set-new-password",
        element: <SetNewPassword />,
      },
    ],
  },
]);

export default router;
