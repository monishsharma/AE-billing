import React from 'react'
import { columns as staticColumns, createInitialValue, createInitialValueValidation, INPUTS } from './selector';
import Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { COMPANY_TYPE, QUOTATION_FIELDS, QUOTATION_STEPPER_NAME } from '../../constants/app-constant';
import { getCustomerDetail } from '../../helpers/customer-detail';
import Typography from '@mui/material/Typography';
import QuotationItems from './items';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import PageLoader from '../../components/page-loader';
import { getNextInvoiceNo } from '../../helpers/get-invoice-no';
import { useParams } from 'react-router-dom';
import { performValidation } from '../../helpers/perform-validation';
import { useNavigate } from "react-router-dom";



const CreateQuotation = ({
  quotation,
  saveDataConnect,
  getConfigConnect,
  saveQuotationConnect,
  getQuotationByIdConnect
}) => {
  const {
    [QUOTATION_STEPPER_NAME.QUOTATION_DETAIL]: {
      quotationCompany
    },
    [QUOTATION_STEPPER_NAME.GOODS_DESCRIPTION]: {
      items = []
    }
  } = quotation || {};

  const {quotationDetail = {}, buyerDetail} = quotation;
  const { id } = useParams();
  const navigate = useNavigate();
  const vendorList = useSelector((state) => state.config.vendorsList);
  const filteredVendorList = vendorList?.filter((vendor) => vendor.type === quotationCompany);
  const optionsMap = {
    vendorList: filteredVendorList?.map((v) => ({
      value: v.id,
      label: v.label,
    })),
    companyType: Object.keys(COMPANY_TYPE).map((type) => ({
        value: COMPANY_TYPE[type],
        label: COMPANY_TYPE[type],
    })),
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [columns, setColumns] = React.useState(staticColumns);
  const [quotationFormValidation, setQuotationFormValidation] = React.useState({

    [QUOTATION_FIELDS.QUOTATION_NO]: true,
    [QUOTATION_FIELDS.QUOTATION_COMPANY]: true,
    [QUOTATION_FIELDS.QUOTATION_DATE]: true,
    customer: true,

  });

  const [itemsValidation, setItemsValidation] = React.useState([]);


  React.useEffect(() => {
    if (quotationCompany) {
      setIsLoading(true);
      getConfigConnect()
      .then((res) => {
        const {config: {quotation} = {}} = res;
        const QuotationeNo = getNextInvoiceNo(quotation[quotationCompany], "nextQuotationNo");
        saveDataConnect({
          stepName: QUOTATION_STEPPER_NAME.QUOTATION_DETAIL,
          data: {
            quotationNo: QuotationeNo
          }
        });
        setQuotationFormValidation({
          ...quotationFormValidation,
          [QUOTATION_FIELDS.QUOTATION_NO]: !!QuotationeNo
        })
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      })
    }
  }, [quotationCompany]);

    React.useEffect(() => {
        if (items.length !== itemsValidation.length) {
            setItemsValidation(items.map(() => createInitialValueValidation()));
        }
    }, [items.length]);

  React.useEffect(() => {

    async function fetchData() {
      setIsLoading(true);
      await getQuotationByIdConnect({id});
      setIsLoading(false);
    }
    if (id) fetchData();

  }, [id])

  const onFieldChange = ({ event, stepName, savingItems = false, itemIndex }) => {
    const { name, value } = event.target;
    let customValue = value;
    let vendorDetail;
    // for normal fields //
    let data = {
      [name]: customValue
    };



    // for customer detail auto fill //

    if (stepName === QUOTATION_STEPPER_NAME.BUYER_DETAIL) {
      const index = vendorList.findIndex((vendor) => vendor.id === value);
      if (index !== -1) vendorDetail = vendorList[index];
      customValue = getCustomerDetail({selectedCustomer: vendorDetail});
      data = {
        ...customValue
      }
    }

    // for ITEMS //
    if (savingItems) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        [name]: customValue
      }
      data = {
        items:  updatedItems
      }
    }
    saveDataConnect({
      stepName: stepName,
      data: data
    });

    setQuotationFormValidation({
      ...quotationFormValidation,
      [name]: !!customValue,
      // ...(stepName === QUOTATION_STEPPER_NAME.BUYER_DETAIL && {
      //   [name]:
      // })
    })
  };

  const addItem = () => {
      saveDataConnect({
          stepName: QUOTATION_STEPPER_NAME.GOODS_DESCRIPTION,
          data: {
              items: [...items, createInitialValue()]
          }
      });
  };

  const deleteItem = (idx) => {
      const updatedItems = [...items];
      updatedItems.splice(idx, 1);
      saveDataConnect({
          stepName: QUOTATION_STEPPER_NAME.GOODS_DESCRIPTION,
          data: {
              items: updatedItems
          }
      });
  }


  const validateAllItems = (itemsValidation) => {
    const updatedValidation = itemsValidation.map((validationObj) => {
        return Object.keys(validationObj).reduce((acc, key) => {
            acc[key] = !!validationObj[key];
            return acc;
        }, {});
    });
    const isItemsValid = updatedValidation.every(validationObj => Object.values(validationObj).every(Boolean));

    setItemsValidation(updatedValidation);
    return isItemsValid;
  };



  const saveQuotation = () => {
    const {isValid, updatedValidation} = performValidation({...quotationDetail, customer:buyerDetail.customer});
    setQuotationFormValidation(updatedValidation);
    if (validateAllItems(items) && isValid) {
      setIsLoading(true)
      const { quotationConfig: _, ...rest } = quotation;
      const {goodsDescription: {items = []}} = rest;
      const cost = items.reduce((total, item) => total + (parseFloat(item.rate) || 0), 0);
      const payload = {
        cost,
        ...rest
      }
      saveQuotationConnect(payload)
      .then(() => {
       Swal.fire({
            icon: "success",
            title: `Quotation ${id ? "Updated" : "Created"} Successfully`
        }).then(() => {
            navigate('/quotation', { replace: true });

        })
      setIsLoading(false)

      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error saving quotation',
        });
        setIsLoading(false)

      });
    }

  }

  const handleHeaderChange = (columnId, newLabel) => {
  setColumns(prev =>
    prev.map(col =>
      col.id === columnId ? { ...col, label: newLabel } : col
    )
  );
};

  if (isLoading) return <PageLoader />;
  return (
    <>
      <div className="mt-2">
        <h2 className="fw-bold">New Quotation</h2>
      </div>
      <Box>
      <Grid container spacing={2} mt={4}>
        {
          INPUTS.map((input) => {
            const Component = input.component;
            const options = input.extraProps?.options || optionsMap[input.optionsFrom];
            return (
              <Grid item size={{xs:12, md: 3}} key={input.id}>
                <div className="">
                  <Component
                    fullWidth
                    id={input.id}
                    name={input.name}
                    label={input.placeholder}
                    value={quotation?.[input.stepName]?.[input.name] || ""}
                    placeholder={input.placeholder}
                    onChange={(event) => onFieldChange({event, stepName: input.stepName})}
                    type={input.extraProps?.type || "text"}
                    error={!quotationFormValidation[input.key]}
                    disabled={input.extraProps && input.extraProps.disableOnEdit && id}
                    {...input.extraProps}
                  >
                    {
                      options?.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value} >
                          {opt.label}
                        </MenuItem>
                      ))}
                  </Component>
                  {
                    input.span && <div className="mt-1 ">
                      <Typography
                        variant='body2'
                        color='primary'
                        sx={{
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        {input.spanText}
                      </Typography>
                    </div>
                  }
                </div>
              </Grid>
            );
          })
        }
      </Grid>
      {/* -----------------------ITEMS------------------------- */}
        <div >
          <hr />
          <div className="mt-4">
            <QuotationItems
              items={items}
              addItem={addItem}
              columns={columns}
              deleteItem={deleteItem}
              onFieldChange={onFieldChange}
              handleHeaderChange={handleHeaderChange}
              itemsValidation={itemsValidation}
            />
          </div>
        </div>
      </Box>
      <Box
        sx={{
          height: "35%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ mt: "auto" }}>
          <Button
            loading={isLoading}
            variant="contained"
            onClick={saveQuotation}
            className="customBtn"
          >
            Save Quotation
          </Button>

          <Button
            variant="contained"
            sx={{ ml: 2 }}
            className="outlinedCustomBtn"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default CreateQuotation;