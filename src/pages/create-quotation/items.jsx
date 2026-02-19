import React from 'react'
import { ITEMS_INPUT } from './selector';
import styles from "./style.module.css";
// import Items from '../../components/items'
import { QUOTATION_STEPPER_NAME } from '../../constants/app-constant';
import TextField from '@mui/material/TextField';
import { isMobileDevice } from '../../helpers/is-mobile-device';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditableItems from '../../components/items/editableItems';

const QuotationItems = ({
    columns,
    items,
    addItem,
    deleteItem,
    onFieldChange,
    itemsValidation,
    handleHeaderChange
}) => {



  return (
    <div>
        <EditableItems columns={columns} gridRepeat="repeat(13, 1fr)" onHeaderChange={handleHeaderChange}>
            {
              items.map((_, itemIndex) => {
                return (
                  <div className={styles.itemsContainer} key={itemIndex}>
                    {
                      ITEMS_INPUT.map((input, inputIndex) => (
                        <span key={inputIndex}>
                          <TextField
                            key={`${input.name}-${inputIndex}`}
                            fullWidth
                            variant='standard'
                            id={`${input.name}-${inputIndex}`}
                            name={input.name}

                            // placeholder={input.placeholder}
                            label={input.placeholder}
                            error={!itemsValidation[itemIndex]?.[input.name]}
                            value={items[itemIndex]?.[input.name] || ""}
                            onChange={(event) => onFieldChange({event, stepName: QUOTATION_STEPPER_NAME.GOODS_DESCRIPTION, savingItems: true, itemIndex})}
                            {...input.extraProps}
                          />
                        </span>
                      ))
                    }
                    {
                        isMobileDevice()?
                         items.length > 1 && <Button fullWidth color="error" variant="outlined"  onClick={() => deleteItem(itemIndex)}>
                                Delete
                        </Button>
                        :
                        <Box display="flex" justifyContent="space-around" alignItems="center" width="100%" height="100%">
                            {items.length > 1 && <DeleteOutlinedIcon onClick={() => deleteItem(itemIndex)} sx={{height: "100%", cursor: "pointer"}} color="error" />}
                        </Box>
                    }
                  </div>
                )
              })
            }
          </EditableItems>
          {
            items.length <= 9 && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Button color="primary"  onClick={addItem} className="outlinedCustomBtn">
                        Add More Item
                    </Button>
                </Box>
            )
          }
    </div>
  )
}

export default QuotationItems