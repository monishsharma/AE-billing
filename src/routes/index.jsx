import App from "../App";
import ErrorPage from "../shared/components/not-found";
import Invoice from "../components/invoice";
import InvoiceStepper from "../components/invoice-stepper";
import Vendors from "../pages/vendors";
import AddVendor from "../pages/add-vendor";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
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
    ],
    errorElement: <ErrorPage />,

  },
];

export default routes;