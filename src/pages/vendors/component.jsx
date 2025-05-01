import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import PageLoader from "../../components/page-loader";
import { useNavigate } from "react-router-dom";

const Vendors = ({ config }) => {
  const navigate = useNavigate();

  const { vendorsList = [] } = config || {};

  const uniqueVendorsByPAN = (list) => {
    return Object.values(
      list.reduce((acc, vendor) => {
        if (!acc[vendor.PAN]) {
          acc[vendor.PAN] = vendor; // Just pick one entry per PAN
        }
        return acc;
      }, {})
    );
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [vendors, setVendors] = React.useState([]);

  React.useEffect(() => {
    if (vendorsList.length) {
        setIsLoading(true)
      setVendors(vendorsList);
      setIsLoading(false);

    }
  }, [vendorsList]);


  const addVendor = () => {
    navigate("/add/vendor");
  };

  const onTableRowClick = (id) => {
    navigate(`/edit/vendor/${id}`);
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="mt-4">
      <h2 className="fw-bold">Vendors List</h2>
      <div className="mt-4">
        <Button variant="contained" onClick={addVendor}>
          Add Vendor
        </Button>
      </div>
      <div className="mt-4">
        <TableContainer component={Paper}>
          <Table sx={{minWidth: "1000px"}}>
            <TableHead>
              <TableRow>
                <TableCell>S.no</TableCell>
                <TableCell>Vendor Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>GSTIN</TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((vendor, index) => {
                return (
                  <React.Fragment key={vendor.id || index}>
                    <TableRow
                      sx={{
                        "& > *": { borderBottom: "unset" },
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f5f5f5", // light gray
                        },
                      }}
                      key={index}
                      onClick={() => onTableRowClick(vendor.id)}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell >{vendor.name}</TableCell>
                      <TableCell>{vendor.label}</TableCell>
                      <TableCell>{vendor.GSTIN}</TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Vendors;
