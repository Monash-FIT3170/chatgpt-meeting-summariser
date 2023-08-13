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

function MeetingsScreen({ handleMeetingDetailsClick, setSelectedMeetingId }) {
    const [meeting, setMeetings] = useState([]);

    useEffect(() => {
        // Fetch data from your backend API here
        fetch(`http://localhost:${port}`)
            .then(response => response.json())
            .then(data => setMeetings(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    const handleMeetingCardClick = (meetingId) => {
        handleMeetingDetailsClick()
        setSelectedMeetingId(meetingId);
    }

    return (
        <>
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
                    {meeting.map(meeting => (
                            <MeetingCard
                                id={meeting._id}
                                card_title={meeting.transcript}
                                completed={'meeting.completed'}
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
                {/* Split completed meetings between these two maps somehow */}
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <MeetingCard card_title="Completed card" key={uuidv1(v1options)} completed={true} onCardClick={handleMeetingCardClick}/>
                    ))}
                </div>
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <MeetingCard card_title="Completed card" key={uuidv1(v1options)} completed={true} onCardClick={handleMeetingCardClick}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export {MeetingsScreen};