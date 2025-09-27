import App from "../App";
import ErrorPage from "../shared/components/not-found";
import Invoice from "../components/invoice";
import InvoiceStepper from "../components/invoice-stepper";
import Vendors from "../pages/vendors";
import AddVendor from "../pages/add-vendor";
import Dashboard from "../pages/dashboard";
import Login from "../components/login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "../components/not-found";
import { Navigate } from "react-router-dom";
import Payment from "../pages/payment";

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