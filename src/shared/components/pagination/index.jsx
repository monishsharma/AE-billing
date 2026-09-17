import {
    Box,
    Pagination,
    Skeleton,
    Typography,
} from "@mui/material";

import {
    useGridApiContext,
    useGridSelector,
    gridPaginationModelSelector,
    gridPageCountSelector,
} from "@mui/x-data-grid";

const PaginationToolbar = ({ loading }) => {
    const apiRef = useGridApiContext();

    const paginationModel = useGridSelector(
        apiRef,
        gridPaginationModelSelector
    );

    const pageCount = useGridSelector(
        apiRef,
        gridPageCountSelector
    );

    const { page, pageSize } = paginationModel;

    const rowCount = apiRef.current.getRowsCount();

    const from = rowCount === 0
        ? 0
        : page * pageSize + 1;

    const to = Math.min(
        (page + 1) * pageSize,
        rowCount
    );

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: {
                    xs: "column",
                    sm: "row",
                },
                gap: 1,
                px: 2,
                py: 1,
                minHeight: 48,
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            {loading ? (
                <>
                    <Skeleton
                        variant="text"
                        width={"30%"}
                        height={28}
                    />
                    <Skeleton
                        variant="text"
                        width={"30%"}
                        height={28}
                    />

                </>
            ) : (
                <>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Showing{" "}
                        <Box
                            component="span"
                            fontWeight={600}
                            color="text.primary"
                        >
                            {from}–{to}
                        </Box>
                        {" "}of{" "}
                        <Box
                            component="span"
                            fontWeight={600}
                            color="text.primary"
                        >
                            {rowCount}
                        </Box>
                        {" "}invoices
                    </Typography>

                    <Pagination
                        count={pageCount}
                        page={page + 1}
                        onChange={(_, newPage) => {
                            apiRef.current.setPage(newPage - 1);
                        }}
                        size="small"
                        shape="rounded"
                        siblingCount={1}
                        boundaryCount={1}
                         sx={{
                            "& .MuiPaginationItem-root.Mui-selected": {
                                backgroundColor: "#000",
                                color: "#fff",
                            },
                            "& .MuiPaginationItem-root.Mui-selected:hover": {
                                backgroundColor: "#000",
                            },
                              width: {
                                xs: "50%",
                                sm: "auto",
                            },

                            "& .MuiPagination-ul": {
                                width: "100%",
                                justifyContent: {
                                    xs: "space-between",
                                    sm: "flex-end",
                                },
                            },
                        }}
                    />
                </>
            )}
        </Box>
    );
};

export default PaginationToolbar;