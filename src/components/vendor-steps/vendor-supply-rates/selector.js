import { orderTypeOptions } from "../../../constants/app-constant";

export const intialState = [
    {
        label: "Product Description",
        key: "type",
        intialValue: "",
        name: "type"
    },
    {
        label: "Description",
        key: "description",
        intialValue: "",
        name: "description"
    },
    {
        label: "Rate",
        key: "rate",
        intialValue: "",
        name: "rate"
    },
    {
        label: "Drg No",
        id : "drg",
        name: "drg",
        placeholder: "Drg No",
        key: "drg",
        intialValue: "-",
    },
    {
        label: "code",
        id: "code",
        name: "code",
        placeholder: "Product Type",
        key: "code",
        intialValue: "",
        type: "select",
        extraProps: {
            options: [...orderTypeOptions]
        }
    }

]

export const createInitialValue = () => {
    return intialState.reduce((acc, item) => {
        acc[item.key] = item.intialValue ||  "";
        return acc;
    }, {});
}