import React, { useState } from 'react';
import styles from './Dashboard.module.css';

function MeetingParticipantsTable({meetingId}) {
    const [participants, setParticipants] = useState([]);

    return (
        <>
            <div className={styles.participants_table_header}>
                <table className={styles.participants_table}>
                    <tr>
                        <th>#</th>
                        <th>Participant Name</th>
                        <th>Participant Email</th>
                    </tr>
                </table>
            </div>
        </>
    )
}

export {MeetingParticipantsTable};