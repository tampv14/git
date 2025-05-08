import React from "react";
import { useRoutes } from "react-router-dom";
import ClientLayout from "./layout/client";
import AdminLayout from "./layout/admin";
import { List } from "antd";
import ListStu from "./components/admin/list";
import Add from "./components/admin/add";
import Edit from "./components/admin/edit";
import ListSt from "./components/admin/list";
import Register from "./components/admin/register";
import Login from "./components/admin/login";

type Props = {};

const App = (props: Props) => {
  const routes = useRoutes([
    { path: "/", element: <ClientLayout />, children: [] },
    {
      path: "/dashboard",
      element: <AdminLayout />,
      children: [
        {
          path: "students",
          Component: ListSt,
        },
        {
          path: "students/add",
          Component: Add,
        },
        {
          path: "students/edit/:id",
          Component: Edit,
        },
        {
          path:'register',
          Component:Register
        },
        {
          path:'login',Component:Login
        }
      ],
    },
  ]);
  return routes;
};

export default App;
