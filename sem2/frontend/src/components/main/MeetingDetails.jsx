import { useState } from 'react';
import styles from './MeetingDetails.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import { BorderedHeading } from '../BorderedHeading';
import { MeetingParticipantsTable } from '../meeting/MeetingParticipantsTable';

var config = require('../../config.json');
const port = config.port || 5000;

function MeetingDetails({ meetingId, isMeetingDetailsActive, handleYourMeetingsClick }) {
    const [meetingDetails, setMeetingDetails] = useState(null)
    
    const [participants, setParticipants] = useState([]);
    const addParticipant = (name, email) => {
        const newParticipant = {
            name: name,
            email: email
        };
        setParticipants(prev => [...prev, newParticipant]);
    };

    const deleteParticipant = (email) => {
        setParticipants(prev => prev.filter(participant => participant.email !== email));
    };

    const fetchMeetingDetails = () => {
        axios
            .get(`http://localhost:${port}/${meetingId}`)
            .then((res) => {
                setMeetingDetails(res.data)
                setParticipants(res.data?.attendees)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDelete = () => {
        axios
            .delete(`http://localhost:${port}/api/delete/${meetingId}`)
            .then((res) => {
                handleYourMeetingsClick()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSave = () => {
        axios
            .post(`http://localhost:${port}/meetingSummaries/update/${meetingId}`, {...meetingDetails, attendees: participants})
            .then((res) => {
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchMeetingDetails();
    }, []);

    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.inner_container}>
                    <div className={styles.meeting_box}>
                        <BorderedHeading name="Meeting Details"/>
                        <div className={styles.container}>
                            <div className={styles.left_container}>
                                <div className={styles.summary_box}>
                                    {meetingDetails?.summaryPoints}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.attendees_container}>
                    <MeetingParticipantsTable participants={participants} onDeleteParticipant={deleteParticipant} onAddParticipant={addParticipant} />
                    </div>
                    <div className={styles.button_container}>
                        <button className={styles.delete_button} onClick={handleDelete}>
                            Delete
                        </button>
                        <button className={styles.save_button} onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>


            </div>
        </>
    )
}

export { MeetingDetails }