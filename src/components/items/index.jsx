import React from "react";
import styles from "./style.module.css";

const Items = ({children, columns, style = {}, gridRepeat = "repeat(18, 1fr)"}) => {
    return (
        <>
            <div className={styles.flexContainer} style={style}>
                <div className={styles.gridContainer} style={{gridTemplateColumns: gridRepeat}}>
                    {
                        columns.map((col, index) => (
                            <span className={col.class ? styles.bigGrid : ""} key={index}>{col.label}</span>
                        ))
                    }
                </div>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
};

export default Items;