import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

import map from "lodash/map";
import range from "lodash/range";

import { v1 as uuidv1 } from 'uuid';
import { ColoredLine } from '../ColoredLine';
import { MeetingCard } from '../MeetingCard';

var config = require('../../config.json');
const port = config.port || 5000;

const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2011-11-01').getTime(),
    nsecs: 5678,
};

function MeetingsScreen({ onMeetingDetailsClick }) {
    const [meeting, setMeetings] = useState([]);

    useEffect(() => {
        // Fetch data from your backend API here
        fetch(`http://localhost:${port}/meetingSummaries`)
            .then(response => response.json())
            .then(data => setMeetings(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    const handleMeetingCardClick = (meetingId) => {
        onMeetingDetailsClick(meetingId)
    }

    // Filter meetings
    const inProgessMeetings = meeting.filter(meeting => !meeting.completed);
    const completedMeetings = meeting.filter(meeting => meeting.completed);

    return (
        <>
            <div className={styles.logo_container}>
                <img className={styles.logo} src='../../img/logo.png' alt='Minute Mind' />
                <div className={styles.welcome_back}>Welcome back</div>
            </div>
            <div className={styles.titles}>
                In Progress
            </div>
            <div className={styles.card_container}>
                <ColoredLine colour="#FF8B28" />
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {inProgessMeetings.map(meeting => (
                            <MeetingCard
                                id={meeting._id}
                                card_title={meeting.meeting_name ? meeting.meeting_name : `Meeting ${meeting.createdAt.slice(0, 10)}`}
                                completed={meeting.completed}
                                onCardClick={handleMeetingCardClick}
                            />
                        ))}
                </div>
            </div>
            <div className={styles.titles}>
                Completed
            </div>
            <div className={styles.card_container}>
                <ColoredLine colour="#2891B9" />
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {completedMeetings.map(meeting => (
                            <MeetingCard
                                id={meeting._id}
                                card_title={meeting.meeting_name ? meeting.meeting_name : `Meeting ${meeting.createdAt.slice(0, 10)}`}
                                completed={meeting.completed}
                                onCardClick={handleMeetingCardClick}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}

export {MeetingsScreen};