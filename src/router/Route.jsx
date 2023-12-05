import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RedirectIfAuthenticate from "../authenticate/RedirectIfAuthenticate";
import { Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RedirectIfAuthenticate>
        <Outlet />
      </RedirectIfAuthenticate>
    ),
    children: [{ path: "/", element: <LoginPage /> }],
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
