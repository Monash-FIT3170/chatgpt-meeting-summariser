import React, { useState } from "react";
import styles from "./meeting.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function MeetingParticipantsTable({ participants, onDeleteParticipant, onAddParticipant }) {

    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    if (participants?.length === 0) {
        return <p>No participants available.</p>;
    }

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

    return (
        <>
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
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
                                        className={styles.icon}
                                        onClick={() => onDeleteParticipant(participant.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <DeleteOutlineIcon />
                                    </span>
                                </div>
                            </div>
                        ))}
                        {showAddForm && (
                            <div className={styles.participant_line}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newEmail}
                                    onChange={e => setNewEmail(e.target.value)}
                                />
                                <button onClick={handleAddNewParticipant}>Submit</button>
                            </div>
                        )}
                        <div className={styles.add_participant} onClick={() => setShowAddForm(true)}>
                            + Add New Participant
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { MeetingParticipantsTable };
