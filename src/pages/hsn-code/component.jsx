import { Grid } from '@mui/material'
import React  from 'react';
import Swal from 'sweetalert2';
import { COLUMNS, MODAL_INPUT } from './selector';
import ItemTable from '../../components/item-table';

const HsnCodes = ({
    config,
    postHsnCodeConnect,
    editHSNCodeConnect,
    deleteHsnCodeConnect,
    getHsnCodeListConnect
}) => {

    const {hsn} = config || {};


    React.useEffect(() => {
        getHsnCodeListConnect();
    }, [])


    const onSave = (updatedItem) => {
        const {_id, ...rest} = updatedItem;
        if (_id) {
            editHSNCodeConnect(_id, rest)
            .then(async() => {
                await getHsnCodeListConnect();
                Swal.fire({
                    title: "Successfuly Edited",
                    icon: "success"
                });

            })
            .catch((error) => {
                Swal.fire({
                    title: error,
                    icon: "error"
                })
            })
        } else {
            postHsnCodeConnect(rest)
            .then(async(res) => {
                await getHsnCodeListConnect()
                Swal.fire({
                    title: "Successfuly Added",
                    icon: "success"
                });
            })
            .catch((err) => {
                console.error("Error saving HSN code:", err);
            });
        }

    }


    return (
        <>
            <div className="mt-2">
                <h2 className="fw-bold">Config</h2>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={{
                    lg: 6,
                    sm: 12,
                    xs: 12
                }}>
                    <ItemTable
                        data={hsn}
                        columns={COLUMNS}
                        title="HSN Code LIST"
                        swalText={"Do You  Want to Delete the HSN Code"}
                        btnTitle={"ADD HSN CODE"}
                        modalInput={MODAL_INPUT}
                        onSave={onSave}
                        getItem={getHsnCodeListConnect}
                        deleteItem={deleteHsnCodeConnect}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default HsnCodes