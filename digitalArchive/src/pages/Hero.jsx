import React from 'react';
import heroImg from '../assets/img/heroImg.jpg';
import {Link} from 'react-router-dom';


const Hero = () => {
  return (
    <section className="heroSection">
      <div className="heroContainer">
        <div className="heroContent">
            <h1 className="heroTitle">
              Preserve Your <span className="heroHighlight">Digital Legacy</span>
            </h1>
            <p className="heroDescription">
              A secure and intuitive platform to archive, organize, and access your most important digital assets. Built for students, by students.
            </p>
            <div className="heroActions">
              <Link to="/register" className="btnPrimary">Get Started</Link>
              <Link to="/about" className="btnSecondary">Learn More</Link>
            </div>
        </div>
            <div className="heroImageWrapper">
              <img src={heroImg} alt="heroImg" class="heroImage" />
            </div>
        
      </div>
    </section>
  );
};

export default Hero;
