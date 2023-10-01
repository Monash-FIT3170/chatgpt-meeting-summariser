import React, { useState } from "react";
import styles from "./meeting.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";

var config = require("../../config.json");
const port = config.port || 5001;

function MeetingParticipantsTable({
    participants,
    onDeleteParticipant,
    onAddParticipant,
    showSendEmailButton = true,
}) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newNameError, setNewNameError] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newEmailError, setNewEmailError] = useState(false);

    const handleAddParticipantsClick = () => {
        if (showAddForm) {
            try {
                handleAddNewParticipant();
            } catch (e) {
                alert(e);
            }
        } else {
            setShowAddForm(true);
        }
    };

    const handleAddNewParticipant = () => {
        if (newName && newEmail && !newNameError && !newEmailError) {
            onAddParticipant(newName, newEmail);
            setNewName("");
            setNewEmail("");
        } else {
            if (newNameError != "") {
                throw new Error(newNameError);
            } else if (newEmailError != "") {
                throw new Error(newEmailError);
            }
            throw new Error("Please fill in both name and email fields!");
        }
    };

    const handleNameChange = (name) => {
        setNewName(name);
        if (newName != "") {
            if (!newName.match(/^[a-zA-Z]+$/)) {
                setNewNameError("Only letters");
            } else {
                setNewNameError("");
            }
        } else {
            setNewNameError("Name cannot be empty");
        }
    };

    const handleEmailChange = (email) => {
        setNewEmail(email);
        if (newEmail != "") {
            if (!newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                setNewEmailError("Please use a valid email.");
                return;
            } else if (
                participants.every((participant) => participant.email != email)
            ) {
                setNewEmailError("");
            } else {
                setNewEmailError("Email must be unique.");
            }
        } else {
            setNewEmailError("Email cannot be empty");
        }
    };

    const sendEmail = () => {
        try {
            handleAddNewParticipant();
            setShowAddForm(false);
        } catch (e) {
            alert(e);
            return;
        }

        const data = {
            email: participants.map((participant) => participant.email),
        };

        axios
            .post(`http://localhost:${port}/api/email`, data)
            .then((res) => {})
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
                                        onClick={() =>
                                            onDeleteParticipant(
                                                participant.email
                                            )
                                        }
                                        style={{ cursor: "pointer" }}
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
                                        onChange={(e) =>
                                            handleNameChange(e.target.value)
                                        }
                                    />
                                </div>
                                <div className={styles.t3}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={newEmail}
                                        className={styles.text_input}
                                        onChange={(e) =>
                                            handleEmailChange(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        <div
                            className={styles.add_participant}
                            onClick={handleAddParticipantsClick}
                        >
                            + Add New Participant
                        </div>
                    </div>
                </div>
            </div>
            {showSendEmailButton && (
                <div className={styles.button_container}>
                    <button
                        className={`${styles.email_button} ${styles.button_style}`}
                        onClick={sendEmail}
                    >
                        Send Email
                    </button>
                </div>
            )}
        </>
    );
}

export { MeetingParticipantsTable };
