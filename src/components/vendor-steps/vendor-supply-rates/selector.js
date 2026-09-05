import { orderTypeOptions } from "../../../constants/app-constant";

export const COLUMNS = [
  {
    key: "type",
    label: "Product",
    width: 180,
  },
  {
    key: "description",
    label: "Description",
    minWidth: 320,
  },
  {
    key: "code",
    label: "Type",
    width: 110,
  },

  {
    key: "rate",
    label: "Rate",
    align: "left",
    width: 120,
    render: (value) =>
      value
        ? `₹${Number(value).toLocaleString("en-IN")}`
        : "-",
  },
  {
    key: "drg",
    label: "Drawing No.",
    width: 150,
  },
];


export const INITIAL_FORM = {
  type: "",
  description: "",
  code: "",
  size: "",
  edgeType: "",
  rate: "",
  drg: "",
  sizeType: ""
};

export const PRODUCT_TYPE_OPTIONS = [
  { label: "Frame", value: "FRAME" },
  { label: "Roller", value: "ROLLER" },
  { label: "Bakelite", value: "BAKELITE" },
  { label: "Others", value: "OTHERS" },
];

export const EDGE_TYPE_OPTIONS = [
  { label: "Flange", value: "FLANGE" },
  { label: "Plain", value: "PLAIN" },
  { label: "Dry Type", value: "DRYType" },
];

export const ROLLER_TYPE_OPTIONS = [
  { label: "Single", value: "SINGLE" },
  { label: "Twin", value: "TWIN" },
];

export const SIZE_TYPE_OPTIONS = [
  { label: "MM", value: "MM" },
  { label: "Inch", value: "Inch" },
];

export const PRODUCT_FIELDS = [
  {
    key: "code",
    label: "Product Type",
    type: "select",
    options: PRODUCT_TYPE_OPTIONS,
    grid: 12,
    required: true,
  },
  {
    key: "type",
    label: "Product",
    type: "text",
    placeholder: 'e.g. 300mm Flange Roller',
    grid: 12,
    required: true,
  },
  {
    key: "size",
    label: "Size",
    type: "number",
    placeholder: "e.g. 300",
    grid: 3,
  },
  {
    key: "sizeType",
    label: "Size Type",
    type: "select",
    placeholder: "e.g. MM/Inch",
    options: SIZE_TYPE_OPTIONS,
    grid: 3,
  },
  {
    key: "edgeType",
    label: "Edge Type",
    type: "select",
    options: EDGE_TYPE_OPTIONS,
    grid: 3,
  },
  {
    key: "rollerType",
    label: "Roller Type",
    type: "select",
    options: ROLLER_TYPE_OPTIONS,
    grid: 3,
  },
  {
    key: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter product description",
    multiline: true,
    rows: 3,
    grid: 12,
    required: true,
  },
  {
    key: "rate",
    label: "Rate",
    type: "number",
    placeholder: "0.00",
    grid: 6,
    required: true,
  },
  {
    key: "drg",
    label: "Drawing No.",
    type: "text",
    placeholder: "e.g. T59B308HR-2",
    grid: 6,
  },
];



export const validateProduct = (form) => {
  const errors = {};

  if (!form.type?.trim()) {
    errors.type = "Product is required";
  }

  if (!form.code) {
    errors.code = "Product type is required";
  }

  if (!form.description?.trim()) {
    errors.description = "Description is required";
  }

  if (form.rate === "" || Number(form.rate) < 0) {
    errors.rate = "Enter a valid rate";
  }

  if (form.code === "ROLLER") {
    if (form.size === "" || Number(form.size) <= 0) {
      errors.size = "Size is required";
    }

    if (!form.edgeType) {
      errors.edgeType = "Edge type is required";
    }
  }


  return errors;
};