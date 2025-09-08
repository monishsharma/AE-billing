import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';


export default function Payment({
  uploadPaymentFileConnect
}) {

  const [file, setFile] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(new Date());

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if(!uploadedFile) return;
    setFile(uploadedFile);
  };

  const upload = () => {
    if (!file) {
      alert("Please select an Excel file first");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        setIsLoading(true);

        // Remove metadata prefix (data:application/vnd.ms-excel;base64,...)
        const base64File = e.target.result.split(",")[1];

        let payload = { file: JSON.stringify({ file: base64File }) };

        const data = await uploadPaymentFileConnect(payload);

        setResponse(data);
      } catch (error) {
        console.error("❌ Upload failed:", error);
        alert("Upload failed");
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsDataURL(file); // convert to base64
  }

  const ExampleCustomInput = React.forwardRef(({ value, onClick, className = "customBtn", size }, ref) => (
    <div className="d-grid ">
      <Button onClick={onClick} variant="contained" size={size} ref={ref} className={className}>
        {value}
      </Button>
    </div>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className={`mt-3`}>
          <h2 className="fw-bold">Payment</h2>
      </div>
      <Grid container spacing={2} marginTop={4}>
        <Grid item xs={12} className="w-100">
          <Box
            sx={{
              width: '100%',
              height: "auto",
              border: '1px solid black',
              borderRadius: '25px',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              backgroundColor: '#f9f9f9',
            }}
          >
            <Box component={"label"} sx={{ display: 'flex', alignItems: 'center', flexDirection: "column", gap: 1, cursor: "pointer" }} htmlFor="file-upload">
              <input
                type="file"
                accept=".xlsx"
                style={{ display: "none" }}
                id="file-upload"
                onChange={handleFileChange}
              />
              <FileUploadOutlinedIcon sx={{ fontSize: 30,  }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {
                  file ? `File Uploaded: ${file.name}` : "Upload Payment File"
                }
              </Typography>
              <Typography variant="body1" component="div" sx={{ color: '#555', marginBottom: "10px" }}>
                Accepted formats: XLSX.
              </Typography>
              {
                file &&
                <Button
                  variant="contained"
                  className="customBtn"
                  onClick={upload}
                >
                  Upload File
                </Button>
              }
            </Box>

          </Box>
           <div className={`mt-4`}>
            <Row className="w-100 mt-4" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <Col><h3 className="fw-bold">Payment History</h3></Col>
              <Col sm={12} md={6} lg={2}>
                <div className="d-flex ">
                  <DatePicker
                    selected={dateValue}
                    wrapperClassName="w-100"
                    showMonthYearPicker
                    // onChange={handleDateChange}
                    dateFormat="MMMM, YYYY"
                    customInput={<ExampleCustomInput className="customBtn" />}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
