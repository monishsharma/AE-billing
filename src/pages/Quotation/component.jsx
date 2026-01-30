import React, { useMemo, useState } from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CompanyTabs from '../../components/company-tabs';
import { COMPANY_TYPE } from '../../constants/app-constant';
import { DataGrid } from '@mui/x-data-grid';
import { getColumns } from './selector';


const Quotation = ({
    getQuotationConnect,
    resetReducerConnect
}) => {

    const Navigate = useNavigate();

    const [value, setValue] = useState(COMPANY_TYPE.ASHOK);
    const [quotationList, setQuotationList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 20,
    });



    React.useEffect(() => {
        setIsLoading(true);
        getQuotationConnect({company: value})
        .then((res) => {
            setQuotationList(res.data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err)
            setIsLoading(false);
        })
    }, [value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onClick = () => {
        resetReducerConnect();
        Navigate("/new/quotation");
    };

    const handleRowClick = ({row}) => {
        resetReducerConnect();
        Navigate(`/edit/quotation/${row._id}`);
    }

    const columns = useMemo(() => getColumns({  value }), [ value]);


    const renderContent = () => {
        return (
            <DataGrid
                rows={isLoading ? [] : quotationList}
                getRowId={(row) => row._id}
                columns={columns}
                disableColumnMenu={true}
                onRowClick={handleRowClick}
                loading={isLoading}
                disableRowSelectionOnClick
                disableColumnResize
                sx={{
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus-within': {
                    outline: 'none !important',
                    },
                    cursor: 'pointer',
                }}
                initialState={
                    {
                        pagination: {
                            paginationModel,
                        },
                    }
                }
                // showToolbar
            />
        )
    }

    return (
        <div>
            <div className="mt-2">
                <h2 className="fw-bold">Quotation</h2>
                <Box
                    sx={{
                        mt: 2,
                    }}
                >
                    <Button
                        onClick={onClick}
                        variant="contained"
                        className="customBtn"
                        size="medium"
                        startIcon={<AddIcon />}
                        sx={{
                            textTransform: "none",
                            minWidth: "120px",
                            width: {
                                xs: "100%",
                                sm: "auto",
                            }
                        }}
                    >
                        New Quotation
                    </Button>
                </Box>
            </div>
           <div className="mt-4">
             <CompanyTabs
                value={value}
                onChange={handleChange}
                renderContent={renderContent}
            />
           </div>
        </div>
    )
}

export default Quotation