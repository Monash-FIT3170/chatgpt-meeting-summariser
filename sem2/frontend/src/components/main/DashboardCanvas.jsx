import React, { useState } from 'react';
import BasicStyles from '../Basic.module.css';

import { UploadScreen } from './UploadScreen';
import { DashboardScreen } from './DashboardScreen';
import { MeetingsScreen } from './MeetingsScreen';
import { HeaderPill } from '../HeaderPill';
import { MeetingDetails } from './MeetingDetails';

function DashboardCanvas() {
    const [isUploadActive, setUploadIsActive] = useState(false);
    const [isDashboardActive, setDashboardIsActive] = useState(true);
    const [isYourMeetingsActive, setYourMeetingsIsActive] = useState(false);
    const [isMeetingDetailsActive, setMeetingDetailsIsActive] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);
    
    const handleUploadClick = () => {
        setUploadIsActive(true);
        setDashboardIsActive(false);
        setYourMeetingsIsActive(false);
        setMeetingDetailsIsActive(false);
    };
    const handleDashboardClick = () => {
        setUploadIsActive(false);
        setDashboardIsActive(true);
        setYourMeetingsIsActive(false);
        setMeetingDetailsIsActive(false);
    };
    const handleYourMeetingsClick = () => {
        setUploadIsActive(false);
        setDashboardIsActive(false);
        setYourMeetingsIsActive(true);
        setMeetingDetailsIsActive(false);
    };
    const handleMeetingDetailsClick = () => {
        setUploadIsActive(false);
        setDashboardIsActive(false);
        setYourMeetingsIsActive(false);
        setMeetingDetailsIsActive(true);
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
                    <MeetingsScreen handleMeetingDetailsClick={handleMeetingDetailsClick} setSelectedMeetingId={setSelectedMeetingId} />
                </div>
                {isMeetingDetailsActive && (
                    <div style={{
                        display: isMeetingDetailsActive ? "block" : "none"
                    }}>
                        <MeetingDetails meetingId={selectedMeetingId} isMeetingDetailsActive={isMeetingDetailsActive} handleYourMeetingsClick={handleYourMeetingsClick} />
                    </div>
                )}
            </div>
        </>
    );
}

export { DashboardCanvas };