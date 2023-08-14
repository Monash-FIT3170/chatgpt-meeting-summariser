import React, { useState } from 'react';
import styles from './Dashboard.module.css';

function UploadScreen() {
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	    setIsFilePicked(true);
        document.getElementById("filename").innerText=event.target.files[0].name;
	};


    return (
        <>
            <div className={styles.upload_page}>
                <div className={styles.upload_menu_bar}>
                    Menu Bar TBD
                </div>
                <div className={styles.upload_heading}>Upload new recording</div>
                <div className={styles.file_upload_box}>
                    <div className={styles.file_upload_header_1}>
                        Upload Recording
                        <div className={styles.file_upload_header_2}>
                            in .mp4 or .mp3
                        </div>
                    </div>
                    <div className={styles.file_upload}>
                        <div className={styles.upload_microphone}>
                            
                        </div>
                        <div className={styles.file_name} id="filename">filename.mp4</div>
                        <label for="upload-btn">Browse</label>
                        <input type="file" id="upload-btn" hidden onChange={changeHandler}/>
                    </div>

                </div>
                <div className={styles.summary_heading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="656" height="16" viewBox="0 0 656 16" className={styles.summary_heading_line}>
                        <path d="M639.993 8.03713C640.014 12.4554 643.612 16.0204 648.03 15.9999C652.448 15.9795 656.013 12.3812 655.993 7.96294C655.972 3.54471 652.374 -0.0203682 647.956 0.000118163C643.538 0.0206045 639.973 3.6189 639.993 8.03713ZM1.00696 12.5L648 9.50002L647.986 6.50005L0.993045 9.50002L1.00696 12.5Z" fill="#E9F9FF" fill-opacity="0.25" />
                    </svg>
                    Meeting Summary
                    <svg xmlns="http://www.w3.org/2000/svg" width="651" height="16" viewBox="0 0 651 16" className={styles.summary_heading_line}>
                        <path d="M3.86238e-05 7.97508C-0.0137254 12.3933 3.55682 15.9862 7.97508 16C12.3933 16.0137 15.9862 12.4432 16 8.02492C16.0137 3.60667 12.4432 0.0138027 8.02492 3.86238e-05C3.60667 -0.0137254 0.0138027 3.55682 3.86238e-05 7.97508ZM7.99533 9.49999L649.995 11.5L650.005 8.50001L8.00467 6.50001L7.99533 9.49999Z" fill="#E9F9FF" fill-opacity="0.25" />
                    </svg>
                </div>
                <div className={styles.summary_box}>
                    "Why did ChatGPT get hired to summarize meetings? Because it's really good at 'meeting' expectations!",
                    "ChatGPT walked into a meeting and said, 'I'm here to take notes and chew bubblegum... and I'm all out of bubblegum!'",
                    "Why did ChatGPT become a meeting summarizer? Because it can handle 'byte'-sized information!",
                    "Why did ChatGPT start attending meetings? To prove that it's not just a 'virtual' participant!",
                    "Why was ChatGPT the best choice for meeting summaries? Because it never forgets, unlike some human attendees!",
                    "ChatGPT's favorite part of summarizing meetings? Finding the 'punchline' of the conversation!",
                    "How does ChatGPT like its coffee during meetings? With a little 'byte' of cream and a 'sum' of sugar!",
                    "Why did ChatGPT go to the meeting? To 'interface' with important information!",
                    "ChatGPT's advice for a successful meeting summary? Just 'input' the main points and 'output' the rest!",
                    "Why did ChatGPT start summarizing board meetings? Because it wanted to be the 'board's' best friend!",
                    "Why did ChatGPT always volunteer for meeting summaries? Because it was 'programmed' to excel at it!",
                    "What do you call a meeting that ChatGPT summarizes? A 'bytes'-sized conference!",
                    "Why did ChatGPT join the business meeting? To add a touch of 'AI' to the conversation!",
                    "Why was ChatGPT a great choice for summarizing team huddles? Because it's 'text'-book perfect!",
                    "Why did ChatGPT start summarizing brainstorming sessions? Because it wanted to be the 'bright' side of the meeting!",
                    "Why was ChatGPT a hit at the sales meeting? Because it had the perfect 'pitch' for summaries!",
                    "What's ChatGPT's favorite part of summarizing meetings? Finding the 'kernel' of the discussion!",
                    "Why did ChatGPT get an award for meeting summaries? Because it's always 'ahead' of the curve!",
                    "What does ChatGPT say when it finishes summarizing a long meeting? 'I've 'coded' the highlights for you!'",
                    "Why did ChatGPT start attending project meetings? To help 'debug' the complexities!",
                </div>
                <div className={styles.buttons_container}>
                    <button className={styles.add_meeting_button}>
                        Add Meeting Details
                    </button>
                    <button className={styles.add_participants_button}>
                        Add Meeting Participants
                    </button>
                </div>
            </div>
        </>
    )
}

export {UploadScreen};