import React from 'react';
import { FaGooglePlay, FaAppStore } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id = "footer" style={{ backgroundColor: '#f4f4f4', padding: '20px', textAlign: 'center' }}>
      <div className = "leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
          <FaGooglePlay style={{ marginRight: '10px', fontSize: '24px', color: '#000' }} />
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
          <FaAppStore style={{ fontSize: '24px', color: '#000' }} />
        </a>
      </div>

      <div className ="midFooter">
      <h1>App Name</h1>
      <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
