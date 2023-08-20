import React, { useState } from 'react';
import styles from './MeetingParticipants.module.css'

function MeetingParticipants({ participants }) {
    if (participants?.length === 0) {
        return <p>No participants available.</p>;
    }

    return (
        <>
            <table className={styles.participants_table}>
                <thead>
                    <tr>
                        <th className={styles.participant_number}>#</th>
                        <th className={styles.participant_name}>Name</th>
                        <th className={styles.participant_email}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {participants?.map((participant, index) => (
                        <tr>
                            <td className={styles.participant_number}>{index + 1}</td>
                            <td className={styles.participant_name}>{participant?.name}</td>
                            <td className={styles.participant_email}>{participant?.email}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </>
    )
}

export { MeetingParticipants };