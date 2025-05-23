import React from 'react';
import styles from './style.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Pagination = ({
    totalpage,
    paginationModel,
    setPaginationModel
}) => {

    const { page, pageSize } = paginationModel

    const onClickBack = () => {
        if (page === 0) return
        setPaginationModel(prev => ({ ...prev, page: prev.page - 1 }));
    }

    const onClickNext = () => {
        if ((page + 1) * pageSize >= totalpage) return
        setPaginationModel(prev => ({ ...prev, page: prev.page + 1 }))
    }


    return (
        <div className={styles.pagination}>
            <div className="d-flex justify-space-between align-items-center w-100">
                <div className={styles.paginationItem}>
                    <ArrowBackIosIcon onClick={onClickBack} sx={{
                        color: page === 0 ? "grey" : "white",
                    }} />
                </div>
                <div className={"text-center "} style={{flex: 1}}>
                    Page {page + 1} of {Math.ceil(totalpage / pageSize)}
                </div>
                <div className={styles.paginationItem}>
                    <ArrowForwardIosIcon onClick={onClickNext}
                        sx={{
                            color: (page + 1) * pageSize >= totalpage ? "grey" : "white",
                        }}
                    />
                </div>

            </div>
        </div>
    )
}

export default Pagination