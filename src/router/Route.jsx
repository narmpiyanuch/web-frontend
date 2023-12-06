import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import RedirectIfAuthenticate from "../authenticate/RedirectIfAuthenticate";
import UserAuthenticate from "../authenticate/UserAuthenticate";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RedirectIfAuthenticate>
        <Outlet />
      </RedirectIfAuthenticate>
    ),
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/",
    element: (
      <UserAuthenticate>
        <Outlet />
      </UserAuthenticate>
    ),
    children: [{ path: "/homepage", element: <HomePage /> }],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
