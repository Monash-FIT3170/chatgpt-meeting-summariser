import React, { useState } from 'react';
import styles from './Dashboard.module.css';

import map from "lodash/map";
import range from "lodash/range";

import { v1 as uuidv1 } from 'uuid';
import { ColoredLine } from '../ColoredLine';
import { MeetingCard } from '../MeetingCard';

const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2011-11-01').getTime(),
    nsecs: 5678,
};

function DashboardScreen({ onUploadClick }) {
    return (
        <>
            <div className={styles.logo_container}>
                <img className={styles.logo} src='../../img/logo.png' alt='Minute Mind' />
                <div className={styles.welcome_back}>Welcome back</div>
            </div>
            <div className={styles.dashboard_span}>
                <div className={styles.new_meeting_box}>
                    <div className={styles.create_new_meeting} onClick={onUploadClick}>
                        Click to create new meeting summary
                    </div>
                </div>
            </div>
            <div className={styles.titles}>
                Most Recent
            </div>
            <div className={styles.card_container}>
                <ColoredLine colour="#FF8B28" />
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <MeetingCard card_title="Draft card" key={uuidv1(v1options)} completed={false} />
                    ))}
                </div>
            </div>
        </>
    )
}

export {DashboardScreen}