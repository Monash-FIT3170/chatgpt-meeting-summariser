import React, { useState } from 'react';
import styles from "./main/Dashboard.module.css";

function BorderedHeading({name}) {
    return (
        <div className={styles.heading_box}>
            <svg xmlns="http://www.w3.org/2000/svg" width="656" height="16" viewBox="0 0 656 16" className={styles.heading_line}>
                <path d="M639.993 8.03713C640.014 12.4554 643.612 16.0204 648.03 15.9999C652.448 15.9795 656.013 12.3812 655.993 7.96294C655.972 3.54471 652.374 -0.0203682 647.956 0.000118163C643.538 0.0206045 639.973 3.6189 639.993 8.03713ZM1.00696 12.5L648 9.50002L647.986 6.50005L0.993045 9.50002L1.00696 12.5Z" fill="#E9F9FF" fill-opacity="0.25" />
            </svg>
            <div className={styles.upload_heading}>
                {name}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="651" height="16" viewBox="0 0 651 16" className={styles.heading_line}>
                <path d="M3.86238e-05 7.97508C-0.0137254 12.3933 3.55682 15.9862 7.97508 16C12.3933 16.0137 15.9862 12.4432 16 8.02492C16.0137 3.60667 12.4432 0.0138027 8.02492 3.86238e-05C3.60667 -0.0137254 0.0138027 3.55682 3.86238e-05 7.97508ZM7.99533 9.49999L649.995 11.5L650.005 8.50001L8.00467 6.50001L7.99533 9.49999Z" fill="#E9F9FF" fill-opacity="0.25" />
            </svg>
        </div>
    )
}

export {BorderedHeading};