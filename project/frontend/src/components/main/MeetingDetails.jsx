import { useState } from 'react';
import styles from './MeetingDetails.module.css';
import style from "./Dashboard.module.css";
import axios from 'axios';
import { useEffect } from 'react';
import { BorderedHeading } from '../BorderedHeading';
import { MeetingParticipantsTable } from '../meeting/MeetingParticipantsTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

var config = require('../../config.json');
const port = config.port || 5000;

function MeetingDetails({ meetingId, handleYourMeetingsClick }) {
    const [meetingDetails, setMeetingDetails] = useState(null)
    const [participants, setParticipants] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showMeetingInfoPopUp , setShowMeetingInfoPopUp ] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSummaryPointsChange = (e) => {
        setMeetingDetails({ ...meetingDetails, summaryPoints: e.target.value })
    };

    const addParticipant = (name, email) => {
        const newParticipant = {
            name: name,
            email: email
        };
        handleSaveForParticipants([...participants, newParticipant], 'A new participant has been added')
        setParticipants(prev => [...prev, newParticipant]);
    };

    const deleteParticipant = (email) => {
        const updatedParticipants = participants.filter(participant => participant.email !== email)
        handleSaveForParticipants(updatedParticipants, 'The participant has been removed')
        setParticipants(prev => prev.filter(participant => participant.email !== email));
    };

    const fetchMeetingDetails = () => {
        axios
            .get(`http://localhost:${port}/${meetingId}`)
            .then((res) => {
                setMeetingDetails(res.data)
                setParticipants(res.data?.attendees)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDelete = () => {
        axios
            .delete(`http://localhost:${port}/api/delete/${meetingId}`)
            .then((res) => {
                handleYourMeetingsClick()
            })
            .catch((err) => {
                toast.error('Something went wrong')
            });
    };

    const handleResend = () => {
        const data = { email: participants.map(participant => participant.email) }
        toast.success('Emails have been sent');

        axios
            .post(`http://localhost:${port}/api/email/${meetingDetails._id}`, data)
            .then((res) => { })
            .catch((err) => {
                toast.error('Something went wrong')
            });
    };

    const handleMarkAsCompleted = () => {
        axios
            .post(`http://localhost:${port}/meetingSummaries/markAsCompleted/${meetingId}`)
            .then((res) => {
                setMeetingDetails({ ...meetingDetails, completed: true })
                toast.success('Marked as completed');
            })
            .catch((err) => {
                toast.error('Something went wrong')
            });
    };

    const handleSave = () => {
        axios
            .post(`http://localhost:${port}/meetingSummaries/update/${meetingId}`, { ...meetingDetails, summaryPoints: meetingDetails?.summaryPoints, attendees: participants })
            .then((res) => {
                toast.success('Your changes have been saved');
            })
            .catch((err) => {
                toast.error('Something went wrong')
            });
    };

    const handleSaveForSummmary = (summary, message) => {
        axios
            .post(`http://localhost:${port}/meetingSummaries/update/${meetingId}`, { ...meetingDetails, summaryPoints: summary })
            .then((res) => {
                toast.success(message);
            })
            .catch((err) => {
                toast.error('Something went wrong')
            });
    };

    const handleSaveForParticipants = (participants, message) => {
        axios
            .post(`http://localhost:${port}/meetingSummaries/update/${meetingId}`, { ...meetingDetails, attendees: participants })
            .then((res) => {
                toast.success(message);
            })
            .catch((err) => {
                toast.error('Something went wrong')
            });
    };

    const handleMeetingInfoClick= ()=>{
        setShowMeetingInfoPopUp(true);
    }
    const closeMeetingInfo =()=>{
        setShowMeetingInfoPopUp(false);
    }

    useEffect(() => {
        fetchMeetingDetails();
    }, []);

    return (
        <>
            <div className={styles.main_container}>
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
                <div className={styles.inner_container}>
                    <div className={styles.meeting_box}>
                        <BorderedHeading name={meetingDetails?.meeting_name ?? "Meeting Details"} />
                        <div className={styles.container}>
                            <div className={styles.left_container}>
                                {isEditMode ? (
                                    <div className={styles.edit_box}>
                                        <textarea
                                            type="text"
                                            value={meetingDetails?.summaryPoints}
                                            onChange={handleSummaryPointsChange}
                                            className={styles.input_box}
                                            autoFocus={isEditMode} // Apply autoFocus when isEditMode is true
                                        />
                                        <button className={styles.edit_icon} onClick={ () => {
                                            toggleEditMode()
                                            handleSaveForSummmary(meetingDetails?.summaryPoints, "Meeting summary has been updated")
                                        }}><TaskAltIcon style={{ fontSize: '2rem' }} /></button>
                                    </div>) : (
                                    <div className={styles.summary_box}>
                                        {meetingDetails?.summaryPoints}
                                        <button className={styles.edit_icon} onClick={toggleEditMode}><EditNoteIcon style={{ fontSize: '2rem' }}/></button>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.attendees_container}>
                        <MeetingParticipantsTable participants={participants} onDeleteParticipant={deleteParticipant} onAddParticipant={addParticipant} showSendEmailButton={false} />
                    </div>
                    <div className={styles.button_container}>
                        <button className={`${styles.delete_button} ${styles.button_style}`} onClick={handleDelete}>
                            Delete
                        </button>
                        <button className={`${styles.resend_button} ${styles.button_style}`} onClick={handleResend}>
                            Resend Emails
                        </button>
                        <button className={`${styles.modify_button} ${styles.button_style}`} onClick={handleMeetingInfoClick}>
                            Edit Meeting Title
                        </button>
                        {showMeetingInfoPopUp && (
                            <MeetingInfoScreen
                            closeMeetingInfo={closeMeetingInfo}
                            meetingID={meetingId}/> )}
                        {!meetingDetails?.completed && <button className={`${styles.mark_as_completed_button} ${styles.button_style}`} onClick={handleMarkAsCompleted}>
                            Mark as Completed
                        </button>}
                        <button className={`${styles.save_button} ${styles.button_style}`} onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

function MeetingInfoScreen({closeMeetingInfo, meetingID}) {
    const [meetingTitle, setMeetingTitle] = useState("");

    const handleSaveButton= async()=>{
        try{
            const res = await axios.get(`http://localhost:${port}/${meetingID}`)
            const meetingDetails = res.data
            const updatedDetails = {
                ...meetingDetails,              // Spread the existing properties
                meetingTitle: meetingTitle,     // Update the title
                };
                            
                // put this back to database 
                saveUpdatedDetails(updatedDetails)
        }
        catch (error) {
            toast.error('Error updating meeting title');
            }
        closeMeetingInfo();
        toast.success('Meeting title has been updated');
    }

    const saveUpdatedDetails = async(updatedDetails)=>{
        try {
            await axios.post(`http://localhost:${port}/update/${meetingID}`, updatedDetails)
                console.log('Meeting details updated ');
            } 
            catch (error) {
                console.error('Error updating :', error);
                // throw error; // You can handle the error as needed
            }
    }

    return(
        <>
            <div  className={style.add_meetinginfo_popup_modal} id="add_meetinginfo_popup">
                <div  className={style.add_meetinginfo_popup_modal_content}>
                    Meeting Details
                    <div className={style.add_meetinginfo_popup_modal_headline}>
                    Meeting Title : 
                    <input type="text" placeholder="Meeting Title" className={style.add_meetinginfo_popup_modal_input} onChange={(e) => setMeetingTitle(e.target.value)}/>
                    </div>
                    <button  className={style.save_meetinginfo_button} onClick={handleSaveButton}>Save</button>
                </div>
            </div>
        </>
    );
}

export { MeetingDetails }