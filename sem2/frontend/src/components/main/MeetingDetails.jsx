import { useState } from 'react';
import styles from './MeetingDetails.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import { MeetingParticipants } from '../meeting/meetingParticpants/MeetingParticipants';
import { BorderedHeading } from '../BorderedHeading';

var config = require('../../config.json');
const port = config.port || 5000;

function MeetingDetails({ meetingId, isMeetingDetailsActive, handleYourMeetingsClick }) {
    const [meetingDetails, setMeetingDetails] = useState(null)

    const fetchMeetingDetails = () => {
        axios
            .get(`http://localhost:${port}/${meetingId}`)
            .then((res) => {
                setMeetingDetails(res.data)
                console.log(res.data);
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
                                    {meetingDetails?.summary_points}
                                </div>
                            </div>
                            <div className={styles.right_container}>
                                <div className={styles.attendees_box}>
                                    <MeetingParticipants participants={meetingDetails?.attendees}/>
                                </div>
                            </div>
                        </div>
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