import React, { useState } from "react";
import styles from "./meeting.module.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var config = require("../../config.json");
const port = config.port || 5001;

function MeetingParticipantsTable({
    participants,
    onDeleteParticipant,
    onAddParticipant,
    handleEmailSend,
    showSendEmailButton = true,
}) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newNameError, setNewNameError] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newEmailError, setNewEmailError] = useState(false);
    const [scheduledDate, setScheduledDate] = useState("");
    const [scheduledTime, setScheduledTime] = useState("");
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [pressedEnter, setPressedEnter] = useState(false);

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

    const handleEmailKeyPress = (e) => {
        if (e.key === "Enter") {
            if (!pressedEnter) {
                handleParticipantEnter();
            }
            setPressedEnter(true);
        } else {
            setPressedEnter(false);
        }
    };

    const handleParticipantEnter = () => {
        try {
            handleAddNewParticipant();
            setShowAddForm(false);
        } catch (e) {
            alert(e);
            return;
        }
    };

    const sendEmail = () => {
        if (showAddForm) {
            try {
                handleAddNewParticipant();
                setShowAddForm(false);
            } catch (e) {
                alert(e);
                return;
            }
        }

        if (handleEmailSend()) {
            toast.success("Emails have been sent");
        } else {
            toast.success("Emails have been sent");
        }
    };

    const scheduleEmail = () => {
        const dateTimeString = `${scheduledDate}T${scheduledTime}:00`;
        const scheduleDateTime = new Date(dateTimeString);

        // Validation check for past date and time
        if (scheduleDateTime < new Date()) {
            alert("Selected date and time cannot be in the past!");
            return;
        }

        const data = {
            email: participants.map((participant) => participant.email),
            scheduleTime: scheduleDateTime.toISOString(),
        };

        axios
            .post(`http://localhost:${port}/api/schedule`, data)
            .then((res) => {
                alert("Email scheduled successfully!");
            })
            .catch((err) => {
                console.log(err);
                alert("Error scheduling the email.");
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
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnHover={false}
                    pauseOnFocusLoss
                />
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
                                        onBlur={handleParticipantEnter}
                                        onKeyDown={handleEmailKeyPress}
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
                    <button
                        className={`${styles.schedule_button} ${styles.button_style}`}
                        onClick={() => setShowScheduleForm(!showScheduleForm)}
                    >
                        Schedule Email
                    </button>
                    {showScheduleForm && (
                        <>
                            <TextField
                                type="date"
                                value={scheduledDate}
                                onChange={(e) =>
                                    setScheduledDate(e.target.value)
                                }
                                className={`${styles.date_input} ${styles.date_time_input_bg}`}
                                InputProps={{
                                    className: styles.text_input,
                                }}
                            />
                            <TextField
                                type="time"
                                value={scheduledTime}
                                onChange={(e) =>
                                    setScheduledTime(e.target.value)
                                }
                                className={`${styles.time_input} ${styles.date_time_input_bg}`}
                                InputProps={{
                                    className: styles.text_input,
                                }}
                            />
                            <button
                                className={`${styles.ok_button} ${styles.button_style}`}
                                onClick={scheduleEmail}
                            >
                                Confirm
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export { MeetingParticipantsTable };
