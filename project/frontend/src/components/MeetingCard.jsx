import React, { useState } from 'react';
import styles from './main/Dashboard.module.css';

function MeetingCard({ meeting, id, completed, onCardClick }) {
    const card_style = {
        shell: completed ? styles.completed_card : styles.draft_card,
        status: completed ? styles.completed_card_status : styles.draft_card_status,
        chevron: completed ? styles.completed_card_chevron : styles.draft_card_chevron,
        status_colour: completed ? "#2891B9" : "#E9B363",
    }

    const displayTitle = meeting.meetingTitle || 'Default Title';
    const formattedDate = meeting.meetingDate ? new Date(meeting.meetingDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) : new Date(meeting.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={card_style.shell} onClick={event => onCardClick(id) }>
            <div className={styles.card_title}>
                {displayTitle}
            </div>
            <div className={styles.card_title}>
                {formattedDate}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="124" height="32" viewBox="0 0 124 32" fill="none" className={card_style.status}>
                <path d="M0.85498 15.3131C0.85498 7.10487 7.5091 0.450745 15.7174 0.450745H108.143C116.352 0.450745 123.006 7.10486 123.006 15.3131V16.1435C123.006 24.3518 116.352 31.0059 108.143 31.0059H15.7174C7.5091 31.0059 0.85498 24.3518 0.85498 16.1436V15.3131Z" fill={card_style.status_colour} />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white">
                    {completed ? 'Completed' : 'Draft'}
                </text>
            </svg>
            <div className={card_style.chevron}>
                &gt;
            </div>
        </div>
    );
}

export {MeetingCard};