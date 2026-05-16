import React from 'react';

function Footer() {
  return (
    <footer className="footerContainer">
      <div className="footerContent">
        <p className="footerText">
          &copy; {new Date().getFullYear()} Digital Archive. All rights reserved.
        </p>
        <div className="footerLinks">
          <a href="#" className="footerLink">Privacy Policy</a>
          <a href="#" className="footerLink">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
