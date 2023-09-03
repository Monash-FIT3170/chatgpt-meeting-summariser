import React, { useState } from "react";
import styles from "./meeting.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';

var config = require('../../config.json');
const port = config.port || 5001;

function MeetingParticipantsTable({ participants, onDeleteParticipant, onAddParticipant, showSendEmailButton = true }) {

    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleAddNewParticipant = () => {
        if (newName && newEmail) {
            onAddParticipant(newName, newEmail);
            setNewName('');
            setNewEmail('');
            setShowAddForm(false);
        } else {
            alert("Please fill in both name and email fields!");
        }
    }

    const sendEmail = () => {
        const data = {
            email: participants.map(participant => participant.email)
        }

        axios
            .post(`http://localhost:${port}/api/email`, data)
            .then((res) => {
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className={styles.meeting_participants_box}>
                    <div className={styles.meeting_participants_header}>
                        <div className={styles.t1}>#</div>
                        <div className={styles.t2}>Participant Name</div>
                        <div className={styles.t3}>Participant Email</div>
                        <div className={styles.t4}></div>
                    </div>
                    <div className={styles.meeting_participants_table}>
                        {participants?.map((participant, index) => (
                            <div className={styles.participant_line}>
                                <div className={styles.t1}>{index + 1}</div>
                                <div className={styles.t2}>
                                    {participant?.name}
                                </div>
                                <div className={styles.t3}>
                                    {participant?.email}
                                </div>
                                <div className={styles.t4}>
                                    <span
                                        class="form-item-icon material-symbols-rounded"
                                        className={styles.delete_icon}
                                        onClick={() => onDeleteParticipant(participant.email)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <DeleteOutlineIcon />
                                    </span>
                                </div>
                            </div>
                        ))}
                        {showAddForm && (
                            <div className={styles.participant_line}>
                                <div className={styles.t1}></div>
                                <div className={styles.t2}>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={newName}
                                        className={styles.text_input}
                                        onChange={e => setNewName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.t3}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={newEmail}
                                        className={styles.text_input}
                                        onChange={e => setNewEmail(e.target.value)}
                                    />
                                </div>
                                <div className={styles.t4}>                                    
                                <span
                                        class="form-item-icon material-symbols-rounded"
                                        className={styles.add_icon}
                                        onClick={handleAddNewParticipant}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <CheckCircleOutlineIcon />
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className={styles.add_participant} onClick={() => setShowAddForm(true)}>
                            + Add New Participant
                        </div>
                    </div>
                </div>
            </div>
            {showSendEmailButton && (
                <div className={styles.button_container}>
                <button className={`${styles.email_button} ${styles.button_style}`} onClick={sendEmail} >
                            Send Email
                </button>
                </div>
            )}
        </>
    );
}

export { MeetingParticipantsTable };
