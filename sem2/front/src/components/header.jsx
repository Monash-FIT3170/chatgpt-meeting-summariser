import React, { useState } from 'react';
import BasicStyles from './Basic.module.css';

function Header({ title, username }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (option) => {
    console.log(`Selected option: ${option}`);
    // Perform the desired action based on the selected option
    // For example, navigate to a different page or trigger a logout function
  };

  return (
    <>
      <div className={BasicStyles.header}>
        <img src='../../img/logo.png' alt='Minute Mind'></img>
        <span className={BasicStyles.header_title}>
          <p>{title}</p>
        </span>
        <span className={BasicStyles.header_user} id='account' onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
          <p>{username}</p>
          
        </span>
      </div>
      <div>
      {isDropdownOpen && (
            <div className={BasicStyles.dropdown}>
              <ul>
                <li onClick={() => handleDropdownItemClick('account')}>Account</li>
                <li onClick={() => handleDropdownItemClick('settings')}>Settings</li>
                <li onClick={() => handleDropdownItemClick('logout')}>Logout</li>
              </ul>
            </div>
          )}
          </div>
    </>
  );
}

export default Header;
