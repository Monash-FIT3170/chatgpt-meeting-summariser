import React, { useState } from 'react';
import BasicStyles from '../Basic.module.css';

import { UploadScreen } from './UploadScreen';
import { DashboardScreen } from './DashboardScreen';
import { MeetingsScreen } from './MeetingsScreen';
import { HeaderPill } from '../HeaderPill';
import { MeetingDetails } from './MeetingDetails';

function DashboardCanvas() {
    
    const [activeScreen, setActiveScreen] = useState("Dashboard");
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);

    const handleUploadClick = () => {setActiveScreen("Upload")};
    const handleDashboardClick = () => {setActiveScreen("Dashboard")};
    const handleYourMeetingsClick = () => {setActiveScreen("Meetings")};
    const handleMeetingDetailsClick = (meetingId) => {
        setActiveScreen("Meeting-Details")
        setSelectedMeetingId(meetingId)
    };

    const screenComponents = {
        "Dashboard": <DashboardScreen onUploadClick={handleUploadClick}/>,
        "Upload": <UploadScreen/>,
        "Meetings": <MeetingsScreen onMeetingDetailsClick={handleMeetingDetailsClick}/>,
        "Meeting-Details": <MeetingDetails meetingId={selectedMeetingId} />
    }

    return (
        <>
            <div className={BasicStyles.body}>
                <div className={BasicStyles.header2}>
                    <HeaderPill name="Dashboard" onClick={handleDashboardClick} isActive={activeScreen === "Dashboard"} />
                    <HeaderPill name="Upload" onClick={handleUploadClick} isActive={activeScreen === "Upload"} />
                    <HeaderPill name="YourMeetings" onClick={handleYourMeetingsClick} isActive={activeScreen === "Meetings" || activeScreen === "Meeting-Details"} />
                </div>
                <div>
                    {screenComponents[activeScreen]}
                </div>
            </div>
        </>
    );
}

export { DashboardCanvas };