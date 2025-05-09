import React from 'react';
import styles from "./style.module.css";
import { Avatar, Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';


const Card = ({
    count = 0,
    title,
    CardIcon,
    percentage,
    symbol = false,
    showPercentage = true,
    growth
}) => {

    const Icon = growth ? TrendingUpIcon : TrendingDownIcon;

  return (
    <div className={styles.cardContainer}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box display="flex" alignItems="center" justifyContent="center">
                {symbol && <CardIcon style={{ marginRight: 8 }} />} {/* add spacing if needed */}
                <Typography variant="h5">
                    {parseInt(count).toLocaleString('en-IN')}
                </Typography>
            </Box>
            <Avatar sx={{ width: 35, height: 35, background: "transparent", border: "1px solid black"  }}>
                <CardIcon  sx={{color: "Black"}} />
            </Avatar>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5} marginTop={1} minHeight={"20px"}>
            {showPercentage && <>
                <Icon fontSize="small" style={{fontSize: "15px"}} />
                <Typography variant="caption" color={`${growth ? "green" : "red"}`}>{`${percentage} %`}</Typography>
                <Typography variant="caption" style={{opacity: 0.7}}>In this month</Typography>
            </>}
        </Box>
        <div className="mt-4">
            <Typography variant="button" >{title}</Typography>
        </div>
    </div>
  )
}

export default Card