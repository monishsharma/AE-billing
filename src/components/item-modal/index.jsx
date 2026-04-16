import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
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
    selectedItem,
    setSelectedItem
}) => {


    const onChange = (e, item) => {
        setSelectedItem({
            ...selectedItem,
            [item.key]: e.target.value
        })
    }

    const onSaveHandler = () => {
        onSave(selectedItem);
    }

    return (
        <Modal open={open} onClose={toggleModal}>
            <Box style={style}>
                <Box
                    // px={3}
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
                    sx={{
                        display: "flex",
                        gap: 2,
                        mb: 4,
                        mt: 2,
                        flexDirection: "column"
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {
                        INPUT.map((item, index) => (
                            <TextField
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

                <Button  variant='contained' className='customBtn' onClick={onSaveHandler}>Save</Button>
            </Box>
        </Modal>
    )
}

export default ItemModal