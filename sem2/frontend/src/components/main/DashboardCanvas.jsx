import React, { useState } from 'react';
import BasicStyles from '../Basic.module.css';

import { UploadScreen } from './UploadScreen';
import { DashboardScreen } from './DashboardScreen';
import { MeetingsScreen } from './MeetingsScreen';
import { HeaderPill } from '../HeaderPill';

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
                    <HeaderPill name="Dashboard" onClick={handleDashboardClick} isActive={isDashboardActive} />
                    <HeaderPill name="Upload" onClick={handleUploadClick} isActive={isUploadActive} />
                    <HeaderPill name="YourMeetings" onClick={handleYourMeetingsClick} isActive={isYourMeetingsActive} />
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