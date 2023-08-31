import React, { useState } from "react";
import styles from "./main/Dashboard.module.css";

function ColoredLine({ colour }) {
    return (
        <hr
            className={styles.card_hr}
            style={{
                color: colour,
                backgroundColor: colour,
                height: 3,
            }}
        />
    );
}

export { ColoredLine };
