import React, { useState } from "react";
import styles from "./meeting.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function MeetingParticipantsTable({ participants, onDeleteParticipant }) {
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
                        <div className={styles.add_participant}>
                            + Add New Participant
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { MeetingParticipantsTable };
