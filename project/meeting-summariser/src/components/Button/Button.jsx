import './Button.css'
import { useState } from 'react';
import axios from "axios"
import RemoveButton from './RemoveButton';

const Button = () => {
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [summary, setSummary] = useState("");
    const [savedSummaryId, setSavedSummaryId] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("transcript", e.target.files[0]);
        console.log(e.target.files[0])

        //check if any file is chosen and set the file name 
        if (e.target.files.length> 0)
        {
            var file_node= document.getElementById("file")
            var name = e.target.files[0].name
            var div= document.createElement("div");
            div.className= "file_button"
            div.innerText = name 
            file_node.appendChild(div)
            setIsFileUploaded(true); // Set the state to indicate file upload
        }

        axios
            .post("http://localhost:5000/api/save", formData)
            .then((res) => {
                console.log(res.data);
                console.log(res.id);
                setSavedSummaryId(res.id)
            })
            .catch((err) => console.log(err.response.data))

        axios
            .get(`http://localhost:5000/${savedSummaryId}`)
            .then((res) => {
                // Update the state with the summary returned by the API
                setSummary(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
      }
	return (
        <>
        <div id="file">
            <label className='button' htmlFor="file_picker" >
                Upload Recording
            <input hidden type="file" name="file_picker" id="file_picker" onChange={(e) => handleChange(e)}/>
            </label>
            {isFileUploaded ? <RemoveButton /> : null}			
        </div>
        <div>
            <div>
                <p>{summary}</p>
            </div>
        </div>
        </>
        

	);
};

export default Button;
