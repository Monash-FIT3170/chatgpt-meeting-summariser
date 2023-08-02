import React from 'react';
import BasicStyles from '../Basic.module.css';
import styles from './Dashboard.module.css';

import map from "lodash/map";
import range from "lodash/range";

const ColoredLine = ({ colour }) => (
    <hr
        style={{
            color: colour,
            backgroundColor: colour,
            height: 3,
            margin: 0
        }}
    />
);

function DraftCard({ card_title }) {
    return (
        <div className={styles.draft_card}>
            <div className={styles.card_title}>
                {card_title}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="124" height="32" viewBox="0 0 124 32" fill="none" className={styles.draft_card_status}>
                <path d="M0.85498 15.3131C0.85498 7.10487 7.5091 0.450745 15.7174 0.450745H108.143C116.352 0.450745 123.006 7.10486 123.006 15.3131V16.1435C123.006 24.3518 116.352 31.0059 108.143 31.0059H15.7174C7.5091 31.0059 0.85498 24.3518 0.85498 16.1436V15.3131Z" fill="#E9B363" />
            </svg>
            <div className={styles.draft_card_chevron}>
                &gt;
            </div>
        </div>
    );
}

function CompletedCard({ card_title }) {
    return (
        <div className={styles.completed_card}>
            <div className={styles.card_title}>
                {card_title}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="124" height="32" viewBox="0 0 124 32" fill="none" className={styles.completed_card_status}>
                <path d="M0.85498 15.3131C0.85498 7.10487 7.5091 0.450745 15.7174 0.450745H108.143C116.352 0.450745 123.006 7.10486 123.006 15.3131V16.1435C123.006 24.3518 116.352 31.0059 108.143 31.0059H15.7174C7.5091 31.0059 0.85498 24.3518 0.85498 16.1436V15.3131Z" fill="#2891B9" />
            </svg>
            <div className={styles.completed_card_chevron}>
                &gt;
            </div>
        </div>
    );
}

function DashboardCanvas() {
    return (
        <>
            <div className={BasicStyles.header2}>
                <div className={BasicStyles.headerPill}>
                    Dashboard
                </div>
                <div className={BasicStyles.headerPill}>
                    Upload
                </div>
                <div className={BasicStyles.headerPill}>
                    Your Meetings
                </div>
            </div>

            <div className={styles.logo_container}>
                <img className={styles.logo} src='../../img/logo.png' alt='Minute Mind' />
                <div className={styles.welcome_back}>Welcome back</div>
            </div>
            <div className={styles.titles}>
                Most Recent
            </div>
            <div className={styles.card_container}>
                <ColoredLine colour="#FF8B28" />
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <DraftCard card_title="Draft card" />
                    ))}
                </div>
            </div>
            <div className={styles.titles}>
                Completed
            </div>
            <div className={styles.card_container}>
                <ColoredLine colour="#2891B9" />
                {/* Split completed meetings between these two maps somehow */}
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <CompletedCard card_title="Completed card" />
                    ))}
                </div>
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <CompletedCard card_title="Completed card" />
                    ))}
                </div>
            </div>
        </>
    );
}

export { DashboardCanvas };