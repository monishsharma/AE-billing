import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 10,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    background: "white",
    padding: 20
};

const ItemModal = ({
    open,
    onSave,
    title,
    INPUT,
    toggleModal,
    selectedItem = {},
    setSelectedItem,
    flexDirection = "column"
}) => {

    const onChange = (e, item) => {
        setSelectedItem({
            ...selectedItem,
            [item.key]: e.target.value
        })
    }

    const onSaveHandler = (e) => {
        e.preventDefault();
        onSave(selectedItem, INPUT);
    }

    return (
        <Modal open={open} onClose={toggleModal}>
            <Box style={{
                ...style,
                width: flexDirection === "row" ? "50%" : "20%",
            }}>
                <Box
                    pt={2}
                    pb={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h5" fontWeight={600}>{title}</Typography>
                    <CloseOutlinedIcon
                        onClick={toggleModal}
                        sx={{ cursor: 'pointer' }}
                    />
                </Box>

                <Box
                    component="form"
                    onSubmit={onSaveHandler}
                    autoComplete="off"
                    sx={{ width: '100%' }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            mb: 4,
                            mt: 2,
                            flexDirection,
                        }}
                    >
                        {
                            INPUT.map((item, index) => (
                                <TextField
                                    required
                                    fullWidth
                                    key={index}
                                    label={item.label}
                                    value={selectedItem[item.key] || ""}
                                    onChange={(e) => onChange(e, item)}
                                    placeholder={item.label}
                                />
                            ))
                        }
                    </Box>
                    <Button
                        type='submit'
                        variant='contained'
                        className='customBtn'
                        fullWidth
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ItemModal;
