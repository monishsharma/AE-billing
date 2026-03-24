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
const Quotation = React.lazy(() => import("../pages/quotation"));
const NewQuotation = React.lazy(() => import("../pages/create-quotation"));
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { Navigate } from "react-router-dom";
import PurchaseOrder from "../pages/purchase-order";



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
            element: <Navigate to="/dashboard/ASHOK" replace />,
          },
          {
            path: "dashboard",
            element: <Navigate to="/dashboard/ASHOK" replace />,
            errorElement: <ErrorPage />,
          },
          {
            path: "dashboard/:company",
            element: <Dashboard />,
            errorElement: <ErrorPage />,
          },
          {
            path: "invoice",
            element: <Navigate to="/invoice/ASHOK" replace />,
            errorElement: <ErrorPage />,
          },
          {
            path: "invoice/:company",
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
            path: "quotation",
            element: <Navigate to="/quotation/ASHOK" replace />,
          },
          {
            path: "quotation/:company",
            element: <Quotation />,
            errorElement: <ErrorPage />,
          },
          {
            path: "new/quotation",
            element: <NewQuotation />,
            errorElement: <ErrorPage />,
          },
          {
            path: "edit/quotation/:id",
            element: <NewQuotation />,
            errorElement: <ErrorPage />,
          },
          {
            path: "purchase-order",
            element: <Navigate to="/purchase-order/ASHOK" replace />,
          },
          {
            path: "purchase-order/:company",
            element: <PurchaseOrder />,
            errorElement: <ErrorPage />,
          },
          {
            path: "customers",
            element: <Vendors />,
            errorElement: <ErrorPage />,
          },
          {
            path: "add/customers",
            // element: <AddVendorsV2 />,
            element: <AddVendor />,
            errorElement: <ErrorPage />,
          },
          {
            path: "edit/customers/:id",
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