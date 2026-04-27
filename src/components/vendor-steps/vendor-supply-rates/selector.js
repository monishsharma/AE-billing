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
        label: "code",
        id: "code",
        name: "code",
        placeholder: "Product Type",
        key: "code",
        intialStateValue: "",
        type: "select",
        extraProps: {
            options: [...orderTypeOptions]
        }
    }

]

export const createInitialValue = () => {
    return intialState.reduce((acc, item) => {
        acc[item.key] = "";
        return acc;
    }, {});
}