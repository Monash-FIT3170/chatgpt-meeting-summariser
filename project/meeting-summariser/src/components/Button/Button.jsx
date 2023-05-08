import './Button.css'
import axios from "axios"

const Button = () => {
    const handleChange = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("transcript", e.target.files[0]);

        //check if any file is chosen and set the file name 
        if (e.target.files.length> 0){
            var file_node= document.getElementById("file")
            var name = e.target.files[0].name
            var div= document.createElement("div");
            div.className= "file_button"
            div.innerText = name 
            file_node.appendChild(div)
        }


        axios
            .post("http://localhost:5000/api/save", formData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err.response.data))
      }
	return (

        <div id="file">
            <label className='button' htmlFor="file_picker" >
                Upload Recording
            <input hidden type="file" name="file_picker" id="file_picker" onChange={(e) => handleChange(e)}/>
            </label>			
        </div>

	);
};




export default Button;
