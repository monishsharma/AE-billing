import App from "../App";
import React from "react";
const ErrorPage = React.lazy(() => import("../shared/components/not-found"));
const Invoice = React.lazy(() => import("../components/invoice"));
const InvoiceStepper = React.lazy(() => import("../components/invoice-stepper"));
const Vendors = React.lazy(() => import("../pages/vendors"));
const AddVendor = React.lazy(() => import("../pages/add-vendor"));
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Login = React.lazy(() => import("../components/login"));
const NotFound = React.lazy(() => import("../components/not-found"));
const Payment = React.lazy(() => import("../pages/payment"));
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const routes = [
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        element: <App />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            errorElement: <ErrorPage />,
          },
          {
            path: "invoice",
            element: <Invoice />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new/invoice",
            element: <InvoiceStepper />,
            errorElement: <ErrorPage />,
          },
          {
            path: "edit/invoice/:id",
            element: <InvoiceStepper />,
            errorElement: <ErrorPage />,
          },
          {
            path: "vendors",
            element: <Vendors />,
            errorElement: <ErrorPage />,
          },
          {
            path: "add/vendor",
            // element: <AddVendorsV2 />,
            element: <AddVendor />,
            errorElement: <ErrorPage />,
          },
          {
            path: "edit/vendor/:id",
            element: <AddVendor />,
            errorElement: <ErrorPage />,
          },
          {
            path: "payment",
            element: <Payment />,
            errorElement: <ErrorPage />,
          }
        ],
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Login />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;