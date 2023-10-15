import React, { useState } from "react";
import { HeaderPill } from "../HeaderPill";
import styles from "./Dashboard.module.css";
import loaderStyle from "./Loader.module.css";
import { MeetingParticipantsTable } from "../meeting/MeetingParticipantsTable";
import { BorderedHeading } from "../BorderedHeading";
import LoadingJokes from "../LoadingJokes";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var config = require("../../config.json");
const port = config.port || 5001;

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
            email: email,
        };
        setParticipants((prev) => [...prev, newParticipant]);
    };

    const deleteParticipant = (email) => {
        setParticipants((prev) =>
            prev.filter((participant) => participant.email !== email)
        );
    };

    const handleEmailSend = () => {
        const data = {
            email: participants.map((participant) => participant.email),
        };

        axios
            .post(`http://localhost:${port}/api/email`, data)
            .then((res) => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    };

    const screenComponents = {
        RecordingUpload: (
            <RecordingUploadScreen
                onAddParticipant={handleMeetingParticipantsClick}
            />
        ),
        MeetingParticipants: (
            <MeetingParticipantsScreen
                participants={participants}
                handleEmailSend={handleEmailSend}
                onAddParticipant={addParticipant}
                onDeleteParticipant={deleteParticipant}
            />
        ),
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
                    <img
                        className={styles.upload_logo}
                        src="../../img/logo.png"
                        alt="Minute Mind"
                    />
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
    const [Language, setLanguage] = useState("English");
    const [SummaryType, setSummaryType] = useState("English");
    const [showAddParticipants, setShowAddParticipants] = useState(false);
    const [participantName, setParticipantName] = useState("");
    const [participantEmail, setParticipantEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [innerText, setInnerText] = useState("");
    const [showMeetingInfoPopUp, setShowMeetingInfoPopUp] = useState(false);
    const [meetingID, setMeetingID] = useState("");

    const [isEditMode, setIsEditMode] = useState(false);
    const [meetingDetails, setMeetingDetails] = useState(null);
    const [mId, setMId] = useState("");
    const [isSummaryAvailable, setIsSummaryAvailable] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSummaryPointsChange = (e) => {
        setMeetingDetails({ ...meetingDetails, summaryPoints: e.target.value });
    };

    const handleSaveForSummmary = (summary, message) => {
        axios
            .post(`http://localhost:${port}/meetingSummaries/update/${mId}`, {
                ...meetingDetails,
                summaryPoints: summary,
            })
            .then((res) => {
                toast.success(message);
            })
            .catch((err) => {
                toast.error("Something went wrong");
            });
    };

    const handleMeetingInfoClick = () => {
        if (isUploaded) {
            setShowMeetingInfoPopUp(true);
        }
    };
    const closeMeetingInfo = () => {
        setShowMeetingInfoPopUp(false);
    };

    const handleInnerText = (text) => {
        setInnerText(text);
    };
    const handleAddParticipantsClick = () => {
        setShowAddParticipants(true);
    };

    const handleLanguage = (e) => {
        setLanguage(e.target.value);
    };

    const handleSummaryType = (e) => {
        setSummaryType(e.target.value);
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
        const fileExtension = event.target.files[0].name.split(".").pop();
        // ensure is a MP4 file
        if (fileExtension === "MP4" || fileExtension === "mp4") {
            setIsUploading(true);
            document.getElementById("filename").innerText =
                event.target.files[0].name;
            // form data
            const formData = new FormData();
            formData.append("mp4File", event.target.files[0]);
            formData.append("summaryType", SummaryType);
            console.log("tryyyy");

            // save to database
            try {
                const response = await axios.post(
                    `http://localhost:${port}/saveFile`,
                    formData
                );

                meetingid = response.data.id;
                setMId(meetingid);
                console.log(meetingid);
                console.log("successs");
                setIsUploaded(true);
            } catch (error) {
                console.log("FAILED");
                console.log(error.response);
            }
        } else {
            console.log("Wrong File format");
        }

        //updating the text if the translation is required
        if (Language !== "English") {
            console.log("Translating text");
            // Create a promise to handle the translation process
            // basically it just creates a "function" where our translated text variable won't be assigned
            // until the translation has finished. Helps w/ rendering
            const translationPromise = new Promise(async (resolve, reject) => {
                try {
                    // First retrieve the text from the database using the "get" route
                    const response = await axios.get(
                        `http://localhost:${port}/${meetingid}`
                    );
                    const originalMeeting = response.data;
                    const meetingData = response.data.summaryPoints;

                    // Create a new translated text using our "translate" route
                    const translateSchema = {
                        text: meetingData,
                        targetLanguage: Language,
                    };
                    console.log("translating text");
                    const translationResponse = await axios.post(
                        `http://localhost:${port}/translate`,
                        translateSchema
                    );
                    const translatedText =
                        translationResponse.data.translatedText;
                    console.log("translation: " + translatedText);

                    // Update the meetingData object with the translated text
                    originalMeeting.summaryPoints = translatedText;

                    // Update the data in the database using the "update" route
                    console.log("updating text into db");
                    await axios.post(
                        `http://localhost:${port}/update/${meetingid}`,
                        originalMeeting
                    );

                    // Resolve the promise with the translated text
                    resolve(translatedText);
                } catch (error) {
                    console.log("An error has occurred:", error);
                    reject(error);
                }
            });

            // wait for the promise to resolve
            translationPromise.then((translatedText) => {
                // now can use translated text variable cos translation has finished execution
                console.log("Translated text:", translatedText);

                //update the innerText of summarybox to display
                var summary_box = document.getElementById("summary_box");
                summary_box.innerText = translatedText;
            });
        } else {
            if (meetingid !== "") {
                setMeetingID(meetingid);
                var summary_box = document.getElementById("summary_box");
                console.log("there is a meeting");
                // get the summaryPoints from the first API req
                axios
                    .get(`http://localhost:${port}/${meetingid}`)
                    .then((res) => {
                        // update the summarybox.innerText with non-translated data
                        console.log(res.data.summar);
                        summary_box.innerText = res.data.summaryPoints;
                    })
                    .catch((error) => {
                        console.log("An error has occurred:", error);
                    });
            }
        }
    };
    return (
        <>
            <div className={styles.upload_page}>
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
                <BorderedHeading name="Upload new recording" />
                <div className={styles.summary_heading}>
                    Select Summary Type
                </div>
                <div
                    className={styles.language_dropdown}
                    id="summaryType_select"
                >
                    <select
                        className={styles.dropdown}
                        name="summaryType"
                        id="summaryType"
                        value={SummaryType}
                        onChange={handleSummaryType}
                    >
                        <option
                            value="Standard"
                            className={styles.dropdown_option}
                        >
                            Standard
                        </option>
                        <option
                            value="Action Items"
                            className={styles.dropdown_option}
                        >
                            Action Items
                        </option>
                        <option
                            value="Dot Points"
                            className={styles.dropdown_option}
                        >
                            Dot Points
                        </option>
                    </select>
                </div>
                <div className={styles.summary_heading}>Select Language</div>
                <div className={styles.language_dropdown} id="language_select">
                    <select
                        className={styles.dropdown}
                        name="language"
                        id="language"
                        value={Language}
                        onChange={handleLanguage}
                    >
                        <option
                            value="english"
                            className={styles.dropdown_option}
                        >
                            English
                        </option>
                        <option
                            value="french"
                            className={styles.dropdown_option}
                        >
                            French
                        </option>
                        <option
                            value="spanish"
                            className={styles.dropdown_option}
                        >
                            Spanish
                        </option>
                    </select>
                </div>
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
                            style={{ width: 0, height: 0 }}
                            onChange={changeHandler}
                        />
                    </div>
                </div>

                <div className={styles.summary_heading}>Meeting Summary</div>

                {isSummaryAvailable && (
                    <>
                        {isEditMode ? (
                            <div className={styles.edit_box}>
                                <textarea
                                    type="text"
                                    value={meetingDetails?.summaryPoints}
                                    onChange={handleSummaryPointsChange}
                                    className={styles.input_box}
                                    autoFocus={isEditMode}
                                />
                                <button
                                    className={styles.edit_icon}
                                    onClick={() => {
                                        toggleEditMode();
                                        handleSaveForSummmary(
                                            meetingDetails?.summaryPoints,
                                            "Meeting summary has been updated"
                                        );
                                    }}
                                >
                                    <TaskAltIcon style={{ fontSize: "2rem" }} />
                                </button>
                            </div>
                        ) : (
                            <div className={styles.edit_box}>
                                <textarea
                                    readOnly
                                    type="text"
                                    value={meetingDetails?.summaryPoints}
                                    onChange={handleSummaryPointsChange}
                                    className={styles.input_box}
                                    autoFocus={isEditMode}
                                />
                                <button
                                    className={styles.edit_icon}
                                    onClick={toggleEditMode}
                                >
                                    <EditNoteIcon
                                        style={{ fontSize: "2rem" }}
                                    />
                                </button>
                            </div>
                        )}
                    </>
                )}
                {!isSummaryAvailable && (
                    <div className={styles.summary_box} id="summary_box">
                        {isUploading && <SummaryLoader></SummaryLoader>}
                    </div>
                )}

                {showAddParticipants && (
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={participantEmail}
                            onChange={(e) =>
                                setParticipantEmail(e.target.value)
                            }
                        />
                        <button onClick={handleSubmitParticipant}>
                            Submit
                        </button>
                        <button onClick={handleCancelClick}>Cancel</button>
                        {errorMessage && (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                        )}
                    </div>
                )}
                <div>
                    <button
                        className={styles.add_meetinginfo_button}
                        onClick={handleMeetingInfoClick}
                    >
                        Add Meeting Details
                    </button>
                    {showMeetingInfoPopUp && (
                        <MeetingInfoScreen
                            closeMeetingInfo={closeMeetingInfo}
                            meetingID={meetingID}
                        />
                    )}
                    <button
                        className={styles.add_participants_button}
                        onClick={onAddParticipant}
                    >
                        Add Meeting Participants
                    </button>
                </div>
            </div>
        </>
    );
}

function MeetingParticipantsScreen({
    participants,
    onDeleteParticipant,
    onAddParticipant,
    handleEmailSend,
}) {
    return (
        <>
            <BorderedHeading name="Edit Meeting Participants" />
            <MeetingParticipantsTable
                participants={participants}
                onDeleteParticipant={onDeleteParticipant}
                onAddParticipant={onAddParticipant}
                handleEmailSend={handleEmailSend}
            />
        </>
    );
}

function SummaryLoader({}) {
    return (
        <>
            <div className={loaderStyle.container}>
                <div className={loaderStyle.loader}></div>
                <LoadingJokes />
            </div>
        </>
    );
}

function MeetingInfoScreen({ closeMeetingInfo, meetingID }) {
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingDate, setMeetingDate] = useState("");

    const handleSaveButton = async () => {
        if (meetingTitle !== "" && meetingDate !== "") {
            // get the database details using meeting id
            try {
                const res = await axios.get(
                    `http://localhost:${port}/${meetingID}`
                );
                console.log("success");
                const meetingDetails = res.data;
                console.log(meetingDetails);

                const updatedDetails = {
                    ...meetingDetails, // Spread the existing properties
                    meetingTitle: meetingTitle, // Update the title
                    meetingDate: meetingDate, // Update the date
                };

                // put this back to database
                saveUpdatedDetails(updatedDetails);
            } catch (error) {
                console.error("Error fetching meeting details:", error);
                throw error; // You can handle the error as needed
            }

            console.log("in save button");
            console.log(meetingTitle, meetingDate);
        }

        closeMeetingInfo();
    };

    const saveUpdatedDetails = async (updatedDetails) => {
        try {
            await axios.post(
                `http://localhost:${port}/update/${meetingID}`,
                updatedDetails
            );
            console.log("Meeting details updated ");
        } catch (error) {
            console.error("Error updating :", error);
            // throw error; // You can handle the error as needed
        }
    };

    return (
        <>
            <div
                className={styles.add_meetinginfo_popup_modal}
                id="add_meetinginfo_popup"
            >
                <div className={styles.add_meetinginfo_popup_modal_content}>
                    Meeting Details
                    <div
                        className={styles.add_meetinginfo_popup_modal_headline}
                    >
                        Meeting Title :
                        <input
                            type="text"
                            placeholder="Meeting Title"
                            className={styles.add_meetinginfo_popup_modal_input}
                            onChange={(e) => setMeetingTitle(e.target.value)}
                        />
                    </div>
                    <div
                        className={styles.add_meetinginfo_popup_modal_headline}
                    >
                        Meeting Date :
                        <input
                            type="date"
                            className={styles.add_meetinginfo_popup_modal_input}
                            onChange={(e) => setMeetingDate(e.target.value)}
                        />
                    </div>
                    <button
                        className={styles.save_meetinginfo_button}
                        onClick={handleSaveButton}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}

export { UploadScreen };
