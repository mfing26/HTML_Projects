import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';

const Footer = () => {
  return (
    <footer className="text-center py-3">
      <div>
        <p className="mb-0">© {new Date().getFullYear()} World Happiness Rankings. All rights reserved.</p>
        <p>Made for IFQ715 by Your Molly Finglas</p>
      </div>
    </footer>
  );
};

export default Footer;