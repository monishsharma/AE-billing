import { Grid } from '@mui/material'
import React  from 'react';
import Swal from 'sweetalert2';
import { BAKELITE_RATE_COLUMN, BAKELITE_RATE_MODAL_INPUTS, BAKELITE_RATE_OPTIONS, COLUMNS, ITEM_TYPE, MODAL_INPUT } from './selector';
import ItemTable from '../../components/item-table';

const HsnCodes = ({
    config,
    postHsnCodeConnect,
    editHSNCodeConnect,
    deleteHsnCodeConnect,
    getHsnCodeListConnect,
    postBakeliteRateConnect,
    editBakeliteRateConnect,
    deleteBakeliteRateConnect,
    getBakeliteRatesConnect
}) => {

    const {hsn, bakeliteRates} = config || {};
    const handler = {
        [ITEM_TYPE.HSN_CODE]: {
            post: postHsnCodeConnect,
            edit: editHSNCodeConnect,
            delete: deleteHsnCodeConnect,
            get: getHsnCodeListConnect
        },
        [ITEM_TYPE.BAKELITE_RATE]: {
            post: postBakeliteRateConnect,
            edit: editBakeliteRateConnect,
            delete: deleteBakeliteRateConnect,
            get: getBakeliteRatesConnect
        }
    }


    React.useEffect(() => {
        getHsnCodeListConnect();
        getBakeliteRatesConnect()
    }, [])


    const onSave = (updatedItem) => {
        const {_id, ...rest} = updatedItem;
        if (_id) {
            const { edit } = handler[updatedItem.itemType] || {};
            edit(_id, rest)
            .then(async() => {
                const { get } = handler[updatedItem.itemType] || {};
                await get();
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
            const { post } = handler[updatedItem.itemType] || {};
            post(rest)
            .then(async(res) => {
                const { get } = handler[updatedItem.itemType] || {};
                await get();
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
            <Grid container spacing={2}>
                <Grid
                    size={{
                        xs: 12,
                        md:6
                    }}
                >
                    <ItemTable
                        data={hsn}
                        columns={COLUMNS}
                        itemType={ITEM_TYPE.HSN_CODE}
                        title="HSN Code"
                        swalText={"Do You Want to Delete the HSN Code"}
                        btnTitle={"ADD HSN CODE"}
                        modalInput={MODAL_INPUT}
                        onSave={onSave}
                        getItem={getHsnCodeListConnect}
                        deleteItem={deleteHsnCodeConnect}
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <ItemTable
                        data={bakeliteRates}
                        itemType={ITEM_TYPE.BAKELITE_RATE}
                        columns={BAKELITE_RATE_COLUMN}
                        title="Bakelite Rate Config"
                        swalText={"Do You Want to Delete the Rate Config"}
                        btnTitle={"ADD Bakelite Rate"}
                        modalInput={BAKELITE_RATE_MODAL_INPUTS}
                        onSave={onSave}
                        getItem={getBakeliteRatesConnect}
                        deleteItem={deleteBakeliteRateConnect}
                    />
                </Grid>

            </Grid>
        </>
    )
}

export default HsnCodes