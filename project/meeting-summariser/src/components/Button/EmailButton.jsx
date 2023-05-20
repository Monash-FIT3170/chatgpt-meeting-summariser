import { useState } from 'react';
import './Button.css';
import axios from 'axios';

const EmailButton = () => {
    const [showTextField, setShowTextField] = useState(false);
    const [email, setEmail] = useState('');
  
    const handleButtonClick = () => {
      setShowTextField(true);
    };
  
    const handleEmailChange = event => {
      setEmail(event.target.value);
    };
  
    const handleSendEmail = async (e) => {
        e.preventDefault();
        // Make an API request to send the email
        const data = {
            email
        }

       axios.post('http://localhost:5000/api/email', data)
      .then((res) => {
        console.log('Email sent successfully!');
      })
      .catch((error) => {
        console.log('Error:', error.response.data);
      }); 
        
        // Reset the state
        setShowTextField(false);
        setEmail('');
    };

    return (
      <div>
      {!showTextField && (
        <div className="email_button" onClick={handleButtonClick}>
          Email Summary
        </div>
      )}
      {showTextField && (
        <div>
            <form onSubmit={handleSendEmail}>
          <input className='text_field'
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
          <button type='submit' className = "send_button" >Send Email</button>
          </form>
        </div>
      )}

        </div>
       
    )
}

export default EmailButton;