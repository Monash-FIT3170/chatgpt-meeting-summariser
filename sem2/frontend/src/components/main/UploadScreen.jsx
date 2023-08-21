import React, { useState } from "react";
import { HeaderPill } from "../HeaderPill";
import styles from "./Dashboard.module.css";
import loaderStyle from "./Loader.module.css";
import { MeetingParticipantsTable } from "../meeting/MeetingParticipantsTable";
import { BorderedHeading } from "../BorderedHeading";
import LoadingJokes from "../LoadingJokes";
import axios from "axios"; 
var config = require('../../config.json');
const port = config.port ||5001;



function UploadScreen() {
    const [activeScreen, setActiveScreen] = useState("RecordingUpload");
    const [participants, setParticipants] = useState([]);
    const handleRecordingUploadClick = () => {
        setActiveScreen("RecordingUpload");
    };
    const handleMeetingParticipantsClick = () => {
        setActiveScreen("MeetingParticipants");
    };

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

    const screenComponents = {
        RecordingUpload: <RecordingUploadScreen onAddParticipant={handleMeetingParticipantsClick} />,
        MeetingParticipants: <MeetingParticipantsScreen participants={participants} onAddParticipant={addParticipant} onDeleteParticipant={deleteParticipant} />,
    };

    return (
        <>
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div className={styles.upload_menu_bar}>
                    <HeaderPill
                        name="Recording Upload"
                        onClick={handleRecordingUploadClick}
                        isActive={activeScreen === "RecordingUpload"}
                    ></HeaderPill>
                    <img className={styles.upload_logo} src='../../img/logo.png' alt='Minute Mind' />
                    <HeaderPill
                        name="Meeting Participants"
                        onClick={handleMeetingParticipantsClick}
                        isActive={activeScreen === "MeetingParticipants"}
                    ></HeaderPill>
                </div>
            </div>
            <div>{screenComponents[activeScreen]}</div>
        </>
    );
}

function RecordingUploadScreen({ onAddParticipant }) {

    const [showAddParticipants, setShowAddParticipants] = useState(false);
    const [participantName, setParticipantName] = useState("");
    const [participantEmail, setParticipantEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddParticipantsClick = () => {
        setShowAddParticipants(true);
    };

    const handleCancelClick = () => {
        setShowAddParticipants(false);
        setParticipantName("");
        setParticipantEmail("");
    };

    const handleSubmitParticipant = () => {
        if (!participantName.trim() || !participantEmail.trim()) {
            setErrorMessage("Both fields are required.");
            return;
        }
        onAddParticipant(participantName, participantEmail);
        setParticipantName("");
        setParticipantEmail("");
        setShowAddParticipants(false);
        setErrorMessage("");
    };

    const changeHandler = async (event) => {
        var meetingid = "";
        const fileExtension = event.target.files[0].name.split('.').pop();
        // ensure is a MP4 file 
        if( fileExtension === "MP4"|| fileExtension === "mp4"){
            console.log("is correctttt")
            document.getElementById("filename").innerText = event.target.files[0].name;
            // form data 
            const formData = new FormData();
            formData.append("mp4File", event.target.files[0]);
            console.log("tryyyy")
            // save to database 
            try{
                const response = await axios.post(`http://localhost:${port}/saveFile`, formData);
                meetingid = response.data.id;
                console.log(meetingid);
                console.log("successs");
            }
            catch (error){
                console.log("FAILED")
                console.log(error.response);

            }
        }
        else{
            console.log("Wrong File format")
        }
        if (meetingid!==""){
            console.log("there is meeting");
            axios.get(`http://localhost:${port}/${meetingid}`)
                .then(res=>{
                    console.log(res.data.summaryPoints);
                    var summary_box = document.getElementById("summary_box");
                    summary_box.innerText= res.data.summaryPoints;
                })
                .catch(error=>{
                    console.log(error.response);
                })
        }


    };



    return (
        <>
            <div className={styles.upload_page}>
                <BorderedHeading name="Upload new recording" />
                <div className={styles.file_upload_box}>
                    <div className={styles.file_upload_header_1}>
                        Upload Recording
                        <div className={styles.file_upload_header_2}>
                            in .mp4 or .mp3
                        </div>
                    </div>
                    <div className={styles.file_upload}>
                        <div className={styles.upload_microphone}></div>
                        <div className={styles.file_name} id="filename">
                            filename.mp4
                        </div>
                        <label for="upload-btn">Browse</label>
                        <input
                            type="file"
                            id="upload-btn"
                            hidden
                            onChange={changeHandler}/>
                    </div>
                </div>
                <div className={styles.summary_heading}  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="656"
                        height="16"
                        viewBox="0 0 656 16"
                        className={styles.summary_heading_line}
                    >
                        <path
                            d="M639.993 8.03713C640.014 12.4554 643.612 16.0204 648.03 15.9999C652.448 15.9795 656.013 12.3812 655.993 7.96294C655.972 3.54471 652.374 -0.0203682 647.956 0.000118163C643.538 0.0206045 639.973 3.6189 639.993 8.03713ZM1.00696 12.5L648 9.50002L647.986 6.50005L0.993045 9.50002L1.00696 12.5Z"
                            fill="#E9F9FF"
                            fill-opacity="0.25"
                        />
                    </svg>
                    Meeting Summary
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="651"
                        height="16"
                        viewBox="0 0 651 16"
                        className={styles.summary_heading_line}
                    >
                        <path
                            d="M3.86238e-05 7.97508C-0.0137254 12.3933 3.55682 15.9862 7.97508 16C12.3933 16.0137 15.9862 12.4432 16 8.02492C16.0137 3.60667 12.4432 0.0138027 8.02492 3.86238e-05C3.60667 -0.0137254 0.0138027 3.55682 3.86238e-05 7.97508ZM7.99533 9.49999L649.995 11.5L650.005 8.50001L8.00467 6.50001L7.99533 9.49999Z"
                            fill="#E9F9FF"
                            fill-opacity="0.25"
                        />
                    </svg>
                </div>
                <div className={styles.summary_box} id="summary_box">
                    <SummaryLoader></SummaryLoader>
                </div>
                {showAddParticipants && (
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={participantName}
                            onChange={e => setParticipantName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={participantEmail}
                            onChange={e => setParticipantEmail(e.target.value)}
                        />
                        <button onClick={handleSubmitParticipant}>Submit</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    </div>
                )}
                <button className={styles.add_participants_button} onClick={onAddParticipant}>
                    Add Meeting Participants
                </button>
            </div>
        </>
    );
}

function MeetingParticipantsScreen({ participants, onDeleteParticipant, onAddParticipant }) {

    return (
        <>
            <BorderedHeading name="Edit Meeting Participants" />
            <MeetingParticipantsTable participants={participants} onDeleteParticipant={onDeleteParticipant} onAddParticipant={onAddParticipant} />
        </>
    );
}

function SummaryLoader({ }) {
    return (
        <>
            <div className={loaderStyle.container}>
                <div className={loaderStyle.loader}></div>
            <LoadingJokes/>
            </div>
        </>
    )
}

export { UploadScreen };