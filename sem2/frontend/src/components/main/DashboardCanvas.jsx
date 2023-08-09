import React, { useState } from 'react';
import BasicStyles from '../Basic.module.css';
import styles from './Dashboard.module.css';

import map from "lodash/map";
import range from "lodash/range";

import { v1 as uuidv1 } from 'uuid';

const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date('2011-11-01').getTime(),
    nsecs: 5678,
};

const ColoredLine = ({ colour }) => (
    <hr
        className={styles.card_hr}
        style={{
            color: colour,
            backgroundColor: colour,
            height: 3
        }}
    />
);

function Header() {
    return (
        <>
            <div className={BasicStyles.header2}>
                <div className={BasicStyles.headerPill} onClick={this.showDashboard}>
                    Dashboard
                </div>
                <div className={BasicStyles.headerPill} onClick={this.showUpload}>
                    Upload
                </div>
                <div className={BasicStyles.headerPill} onClick={this.showYourMeetings}>
                    Your Meetings
                </div>
            </div>
        </>
    )
}
function DraftCard({ card_title, key }) {
    return (
        <div className={styles.draft_card}>
            <div className={styles.card_title}>
                {card_title}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="124" height="32" viewBox="0 0 124 32" fill="none" className={styles.draft_card_status}>
                <path d="M0.85498 15.3131C0.85498 7.10487 7.5091 0.450745 15.7174 0.450745H108.143C116.352 0.450745 123.006 7.10486 123.006 15.3131V16.1435C123.006 24.3518 116.352 31.0059 108.143 31.0059H15.7174C7.5091 31.0059 0.85498 24.3518 0.85498 16.1436V15.3131Z" fill="#E9B363" />
            </svg>
            <div className={styles.draft_card_chevron}>
                &gt;
            </div>
        </div>
    );
}

function CompletedCard({ card_title, key }) {
    return (
        <div className={styles.completed_card}>
            <div className={styles.card_title}>
                {card_title}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="124" height="32" viewBox="0 0 124 32" fill="none" className={styles.completed_card_status}>
                <path d="M0.85498 15.3131C0.85498 7.10487 7.5091 0.450745 15.7174 0.450745H108.143C116.352 0.450745 123.006 7.10486 123.006 15.3131V16.1435C123.006 24.3518 116.352 31.0059 108.143 31.0059H15.7174C7.5091 31.0059 0.85498 24.3518 0.85498 16.1436V15.3131Z" fill="#2891B9" />
            </svg>
            <div className={styles.completed_card_chevron}>
                &gt;
            </div>
        </div>
    );
}

function YourMeetings() {
    return (
        <>
            <div className={styles.logo_container}>
                <img className={styles.logo} src='../../img/logo.png' alt='Minute Mind' />
                <div className={styles.welcome_back}>Welcome back</div>
            </div>
            <div className={styles.titles}>
                Most Recent
            </div>
            <div className={styles.card_container}>
                <ColoredLine colour="#FF8B28" />
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <DraftCard card_title="Draft card" key={uuidv1(v1options)} />
                    ))}
                </div>
            </div>
            <div className={styles.titles}>
                Completed
            </div>
            <div className={styles.card_container}>
                <ColoredLine colour="#2891B9" />
                {/* Split completed meetings between these two maps somehow */}
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <CompletedCard card_title="Completed card" key={uuidv1(v1options)} />
                    ))}
                </div>
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <CompletedCard card_title="Completed card" key={uuidv1(v1options)} />
                    ))}
                </div>
            </div>
        </>
    )
}

function Upload() {
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

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
                <button className={styles.add_participants_button}>
                    Add Meeting Participants
                </button>
            </div>
        </>
    )
}

function Dashboard({ onUploadClick }) {
    return (
        <>
            <div className={styles.logo_container}>
                <img className={styles.logo} src='../../img/logo.png' alt='Minute Mind' />
                <div className={styles.welcome_back}>Welcome back</div>
            </div>
            <div className={styles.dashboard_span}>
                <div className={styles.new_meeting_box}>
                    <div className={styles.create_new_meeting} onClick={onUploadClick}>
                        Click to create new meeting summary
                    </div>
                </div>
            </div>
            <div className={styles.titles}>
                Most Recent
            </div>
            <div className={styles.card_container}>
                <ColoredLine colour="#FF8B28" />
                <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
                    {map(range(50), _ => (
                        <DraftCard card_title="Draft card" key={uuidv1(v1options)} />
                    ))}
                </div>
            </div>
        </>
    )
}

function DashboardCanvas() {
    const [isUploadActive, setUploadIsActive] = useState(false);
    const [isDashboardActive, setDashboardIsActive] = useState(true);
    const [isYourMeetingsActive, setYourMeetingsIsActive] = useState(false);
    const handleUploadClick = () => {
        setUploadIsActive(true);
        setDashboardIsActive(false);
        setYourMeetingsIsActive(false);
    };
    const handleDashboardClick = () => {
        setUploadIsActive(false);
        setDashboardIsActive(true);
        setYourMeetingsIsActive(false);
    };
    const handleYourMeetingsClick = () => {
        setUploadIsActive(false);
        setDashboardIsActive(false);
        setYourMeetingsIsActive(true);
    };
    return (
        <>
            <div className={BasicStyles.body}>
                <div className={BasicStyles.header2}>
                    <div className={BasicStyles.headerPill} onClick={handleDashboardClick}>
                        Dashboard
                        <svg width="171" height="5" viewBox="0 0 171 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={BasicStyles.headerSmallPill} style={{
                            display: isDashboardActive ? "flex" : "none"
                        }}>
                            <rect width="171" height="5" rx="2" fill="#FF8B28" />
                        </svg>
                    </div>

                    <div className={BasicStyles.headerPill} onClick={handleUploadClick}>
                        Upload
                        <svg width="171" height="5" viewBox="0 0 171 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={BasicStyles.headerSmallPill} style={{
                            display: isUploadActive ? "flex" : "none"
                        }}>
                            <rect width="171" height="5" rx="2" fill="#FF8B28" />
                        </svg>
                    </div>
                    <div className={BasicStyles.headerPill} onClick={handleYourMeetingsClick}>
                        Your Meetings
                        <svg width="171" height="5" viewBox="0 0 171 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={BasicStyles.headerSmallPill} style={{
                            display: isYourMeetingsActive ? "flex" : "none"
                        }}>
                            <rect width="171" height="5" rx="2" fill="#FF8B28" />
                        </svg>
                    </div>
                </div>
                <div style={{
                    display: isUploadActive ? "block" : "none",
                }}>
                    <Upload></Upload>
                </div>
                <div style={{
                    display: isDashboardActive ? "block" : "none"
                }}>
                    <Dashboard onUploadClick={handleUploadClick}></Dashboard>
                </div>
                <div style={{
                    display: isYourMeetingsActive ? "block" : "none"
                }}>
                    <YourMeetings></YourMeetings>
                </div>
            </div>
        </>
    );
}

export { DashboardCanvas };