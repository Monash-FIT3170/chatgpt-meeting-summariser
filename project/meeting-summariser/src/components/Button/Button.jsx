import './Button.css'
// import { AiFillPlusCircle } from 'react-icons/ai';

const Button = () => {
    const handleChange = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        // formData.append("photo", e.target.files[0]);
      };

	return (
		<div>
            <label className='button' htmlFor="file_picker">
                Upload Recording
			<input hidden type="file" name="file_picker" id="file_picker" onChange={(e) => handleChange(e)}/>
            </label>
			
		</div>
	);
};

export default Button;
