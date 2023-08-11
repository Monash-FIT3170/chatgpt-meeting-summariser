import React, { useState } from 'react';
import BasicStyles from '../Basic.module.css';
import styles from './Dashboard.module.css';

import { UploadScreen } from './UploadScreen';
import { DashboardScreen } from './DashboardScreen';
import { MeetingsScreen } from './MeetingsScreen';

function Header() {
    return (
        <>
            <div className={BasicStyles.header2}>
                <div className={BasicStyles.headerPill} onClick={this.showDashboard}>
                    Dashboard
                </div>
                <div className={BasicStyles.headerPill} onClick={this.showUpload}>
                    Upload
                </div>
                <div className={BasicStyles.headerPill} onClick={this.showYourMeetings}>
                    Your Meetings
                </div>
            </div>
        </>
    )
}

function DashboardCanvas() {
    const [isUploadActive, setUploadIsActive] = useState(false);
    const [isDashboardActive, setDashboardIsActive] = useState(true);
    const [isYourMeetingsActive, setYourMeetingsIsActive] = useState(false);
    const handleUploadClick = () => {
        setUploadIsActive(true);
        setDashboardIsActive(false);
        setYourMeetingsIsActive(false);
    };
    const handleDashboardClick = () => {
        setUploadIsActive(false);
        setDashboardIsActive(true);
        setYourMeetingsIsActive(false);
    };
    const handleYourMeetingsClick = () => {
        setUploadIsActive(false);
        setDashboardIsActive(false);
        setYourMeetingsIsActive(true);
    };
    return (
        <>
            <div className={BasicStyles.body}>
                <div className={BasicStyles.header2}>
                    <div className={BasicStyles.headerPill} onClick={handleDashboardClick}>
                        Dashboard
                        <svg width="171" height="5" viewBox="0 0 171 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={BasicStyles.headerSmallPill} style={{
                            display: isDashboardActive ? "flex" : "none"
                        }}>
                            <rect width="171" height="5" rx="2" fill="#FF8B28" />
                        </svg>
                    </div>

                    <div className={BasicStyles.headerPill} onClick={handleUploadClick}>
                        Upload
                        <svg width="171" height="5" viewBox="0 0 171 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={BasicStyles.headerSmallPill} style={{
                            display: isUploadActive ? "flex" : "none"
                        }}>
                            <rect width="171" height="5" rx="2" fill="#FF8B28" />
                        </svg>
                    </div>
                    <div className={BasicStyles.headerPill} onClick={handleYourMeetingsClick}>
                        Your Meetings
                        <svg width="171" height="5" viewBox="0 0 171 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={BasicStyles.headerSmallPill} style={{
                            display: isYourMeetingsActive ? "flex" : "none"
                        }}>
                            <rect width="171" height="5" rx="2" fill="#FF8B28" />
                        </svg>
                    </div>
                </div>
                <div style={{
                    display: isUploadActive ? "block" : "none",
                }}>
                    <UploadScreen></UploadScreen>
                </div>
                <div style={{
                    display: isDashboardActive ? "block" : "none"
                }}>
                    <DashboardScreen onUploadClick={handleUploadClick}></DashboardScreen>
                </div>
                <div style={{
                    display: isYourMeetingsActive ? "block" : "none"
                }}>
                    <MeetingsScreen/>
                </div>
            </div>
        </>
    );
}

export { DashboardCanvas };