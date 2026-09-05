import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { INITIAL_FORM, PRODUCT_FIELDS } from "./selector";

const ProductDialog = ({
  open,
  onClose,
  product = null,
  onSubmit,
}) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(product);

  useEffect(() => {
    if (!open) return;

    setForm(
      product
        ? {
          ...INITIAL_FORM,
          ...product,
        }
        : {
          ...INITIAL_FORM,
        }
    );

    setErrors({});
  }, [open, product]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    PRODUCT_FIELDS.forEach((field) => {
      const value = form[field.key];

      if (
        field.required &&
        (value === "" || value === null || value === undefined)
      ) {
        newErrors[field.key] = `${field.label} is required`;
      }
    });

    if (form.code === "ROLLER") {
      if (
        form.size === "" ||
        form.size === null ||
        form.size === undefined
      ) {
        newErrors.size = "Size is required";
      }

      if (!form.edgeType) {
        newErrors.edgeType = "Edge Type is required";
      }
    }

    if (
      form.rate !== "" &&
      form.rate !== null &&
      form.rate !== undefined &&
      Number(form.rate) < 0
    ) {
      newErrors.rate = "Rate cannot be negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) return;

    const payload = {
      ...form,
      size:
        form.size !== "" &&
          form.size !== null &&
          form.size !== undefined
          ? Number(form.size)
          : null,
      rate:
        form.rate !== "" &&
          form.rate !== null &&
          form.rate !== undefined
          ? String(form.rate)
          : "",
    };

    onSubmit(payload);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography fontSize={20} fontWeight={700}>
          {isEdit ? "Edit Product" : "Add Product"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          {isEdit
            ? "Update product details and supply rate"
            : "Add a new product to the supply rate list"}
        </Typography>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          pt: "20px !important",
          pb: 3,
        }}
      >
        <Grid container spacing={2}>
          {PRODUCT_FIELDS.map((field) => (
            <Grid
              key={field.key}
              size={{
                xs: 12,
                sm: field.grid,
              }}
            >
              <TextField
                fullWidth
                size="small"
                label={field.label}
                type={
                  field.type === "select"
                    ? "text"
                    : field.type
                }
                select={field.type === "select"}
                placeholder={field.placeholder}
                value={form[field.key] ?? ""}
                onChange={(event) =>
                  handleChange(
                    field.key,
                    event.target.value
                  )
                }
                multiline={field.multiline || false}
                minRows={field.rows}
                error={Boolean(errors[field.key])}
                helperText={errors[field.key] || ""}
              >
                {field.type === "select" &&
                  field.options?.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {isEdit
            ? "Save Changes"
            : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;