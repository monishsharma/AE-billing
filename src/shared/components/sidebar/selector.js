import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

export const ROUTES = [
  {
    title: "Dashboard",
    icon: "home-outline",
    path: "/dashboard",
    // isExactRoute: true,
  },
  {
    title: "Invoice",
    icon: "grid-outline",
    path: "/invoice",
  },
  {
    title: "Quotation",
    icon: "document-text-outline",
    path: "/quotation",
  },
  {
    title: "Payment",
    icon: "wallet-outline",
    path: "/payment",
  },
  {
    title: "Vendors",
    icon: "people-outline",
    path: "/vendors",
  },
];

export const PAGES = [
  {
    title: "Dashboard",
    icon: HomeOutlinedIcon,
    path: "/dashboard",
  },
  {
    title: "Sales",
    icon: AttachMoneyOutlinedIcon,
    children: [
      {
        title: "Invoice",
        path: "/invoice",
      },
      {
        title: "Quotation",
        path: "/quotation",
      },
      {
        title: "Customers",
        path: "/customers",
      },
      {
        title: "Payment",
        path: "/payment",
      },
    ],
  },
  {
    title: "Purchases",
    icon: StoreOutlinedIcon,
    children: [
      {
        title: "Purchase Order",
        path: "/purchase-order",
      },

    ],
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    children: [
      {
        title: "Config",
        path: "/settings/config",
      },
    ],
  },
];
