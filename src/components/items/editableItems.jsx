import React, { useState } from "react";
import styles from "./style.module.css";
import { Button, Input } from "@mui/material";

const EditableItems = ({
  children,
  columns,
  onHeaderChange,
  style = {},
  gridRepeat = "repeat(18, 1fr)"
}) => {

  const [editingId, setEditingId] = useState(null);

  return (
    <div className={styles.flexContainer} style={style}>
      <div
        className={styles.gridContainer}
        style={{ gridTemplateColumns: gridRepeat }}
      >
        {columns.map((col) => (
          <span
            key={col.id}
            className={col.class ? styles.bigGrid : ""}
            onDoubleClick={() => setEditingId(col.id)}
          >
            {editingId === col.id ? (
              <Input
                autoFocus
                value={col.label}
                onChange={(e) =>
                  onHeaderChange(col.id, e.target.value)
                }
                onBlur={() => setEditingId(null)}
                className={styles.headerInput}
              />
            ) : (
              col.label
            )}
          </span>
        ))}
        {/* <span className={styles.addHeader}>
          <Button
            size="small"
            variant="outlined"
            // onClick={onAddHeader}
          >
            + Header
          </Button>
        </span> */}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default EditableItems;
