import React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import priceFormatter from '../../helpers/price-formatter';


const CardContainer = ({
    text = "",
    count = 0,
    title,
    CardIcon,
    percentage,
    symbol = false,
    showPercentage = true,
    growth,
    style
}) => {

    const Icon = growth ? TrendingUpIcon : TrendingDownIcon;

  return (
    <>
        <Card style={{...style}} sx={{ boxShadow: "none", borderRadius: "8px", backgroundColor: "#f8f9fc" }}>
            <CardContent>
                <Typography variant="h6" sx={{  fontWeight: "500", margin: "0px 0px 24px" }}>
                    {title}
                </Typography>
                <Typography variant="h3" sx={{  fontWeight: "400", margin: "0px 0px 24px", fontSize: "1.5rem" }}>
                        {symbol && "₹"} {priceFormatter(count)}
                </Typography>
                {
                    showPercentage &&
                    <Typography variant='h6' sx={{ display: "flex", fontWeight: "400", fontSize: "0.8125rem", alignItems: "center"}}>
                        <span style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0 5px",
                            borderRadius: "2px",
                            marginRight: "8px",
                            fontWeight: "600",
                            backgroundColor:growth ?"rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
                            color: growth ? "rgb(76, 175, 80)" : "rgb(244, 67, 54)"
                        }}>
                            {
                                `${growth ? "+" : "-"} ${Math.abs(parseInt(percentage))} %`
                            }
                        </span>
                        in this  {text}
                </Typography>
                }
            </CardContent>
        </Card>
    </>
  )
}

export default CardContainer