import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { COLUMNS } from "./selector";

import StepperButton from "../../steps/stepper-button";
import PageLoader from "../../page-loader";
import PoTypeFilter from "../../potype-filter";
import ProductDialog from "./product-modal";

import {
  FILTER_OPTION,
  VENDOR_STEPS,
} from "../../../constants/app-constant";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const VendorSupplyRates = ({
  id,
  steps,
  index,
  prevStep,
  vendorForm,
  saveData,
  updateVendorList,
  getVendorList,
  setCurrentStepConnect,
  updateVendorConnect,
}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(
    FILTER_OPTION[0]
  );


  const [productModal, setProductModal] =
    useState({
      open: false,
      product: null,
      rowIndex: null,
    });

  const {
    supplyRate: vendorSupplyRateRows = [],
  } = vendorForm || {};

  const filteredProducts =
    activeTab.id === FILTER_OPTION[0].id
      ? vendorSupplyRateRows
      : vendorSupplyRateRows.filter(
          (item) => item.code === activeTab.label
        );

  const handleAdd = () => {
    setProductModal({
      open: true,
      product: null,
      rowIndex: null,
    });
  };

  const handleEdit = (
    product,
    rowIndex
  ) => {
    setProductModal({
      open: true,
      product: {
        ...product,
      },
      rowIndex,
    });
  };

  const handleCloseProductModal = () => {
    setProductModal({
      open: false,
      product: null,
      rowIndex: null,
    });
  };

  const handleProductSubmit = (
    product
  ) => {
    const updatedRows = [
      ...vendorSupplyRateRows,
    ];

    if (productModal.rowIndex !== null) {
      updatedRows[productModal.rowIndex] = product;
    } else {
      updatedRows.push(product);
    }

    saveData({
      stepName:
        VENDOR_STEPS.SUPPLY_RATE,
      data: {
        supplyRate: updatedRows,
      },
    });

    handleCloseProductModal();
  };

  const deleteRow = ({ rowIndex }) => {
    const updatedRows = [
      ...vendorSupplyRateRows,
    ];

    updatedRows.splice(rowIndex, 1);

    saveData({
      stepName:
        VENDOR_STEPS.SUPPLY_RATE,
      data: {
        supplyRate: updatedRows,
      },
    });
  };


  const nextStepHandler = () => {

    setIsLoading(true);

    const {
      currentStep,
      ...rest
    } = vendorForm;

    const action = id ? () => updateVendorConnect(id,rest) : () => updateVendorList(rest);

    action()
      .then(async () => {
        await getVendorList();

        setCurrentStepConnect(0);

        navigate(-1);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Box mt={2}>
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Products
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Manage product rates and
                specifications
              </Typography>

              <Box mt={2}>
                <PoTypeFilter
                  selected={activeTab}
                  onChange={(
                    selectedValue
                  ) =>
                    setActiveTab(
                      selectedValue
                    )
                  }
                />
              </Box>
            </Box>

            <Button
              variant="contained"
              className="outlinedCustomBtn"
              onClick={handleAdd}
            >
              Add Product
            </Button>
          </Box>

          <TableContainer
            sx={{
              px: 1,
              py: 2,
              maxHeight: 300,
            }}
          >
            <Table stickyHeader>
            <TableHead>
              <TableRow>
                {COLUMNS.map(
                  (column) => (
                    <TableCell
                      key={column.key}
                      align={
                        column.align ||
                        "left"
                      }
                      sx={{
                        width:
                          column.width,
                        minWidth:
                          column.minWidth,
                        fontWeight: 600,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  )
                )}

                <TableCell
                  align="center"
                  width={100}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProducts.length >
              0 ? (
                filteredProducts.map(
                  (product) => {
                    const rowIndex =
                      vendorSupplyRateRows.indexOf(
                        product
                      );

                    return (
                      <TableRow
                        key={
                          product._id ||
                          rowIndex
                        }
                        hover
                      >
                        {COLUMNS.map(
                          (column) => {
                            const value =
                              product[
                                column
                                  .key
                              ];

                            return (
                              <TableCell
                                key={
                                  column.key
                                }
                                align={
                                  column.align ||
                                  "left"
                                }
                              >
                                {column.render
                                  ? column.render(
                                      value,
                                      product
                                    )
                                  : value ??
                                    "-"}
                              </TableCell>
                            );
                          }
                        )}

                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleEdit(
                                product,
                                rowIndex
                              )
                            }
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                              deleteRow({
                                rowIndex,
                              })
                            }
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      COLUMNS.length +
                      1
                    }
                    align="center"
                    sx={{
                      py: 6,
                      color:
                        "text.secondary",
                    }}
                  >
                    No supply rates
                    found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}>
        <StepperButton
          steps={steps}
          index={index}
          handleNext={
            nextStepHandler
          }
          handleBack={prevStep}
        />
      </Box>

      <ProductDialog
        open={productModal.open}
        product={productModal.product}
        onClose={handleCloseProductModal}
        onSubmit={handleProductSubmit}
      />
    </>
  );
};

export default VendorSupplyRates;