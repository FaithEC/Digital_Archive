import React from 'react';
import aboutImg from '../assets/img/about illu.png';

const About = () => {
  return (
    <section className="aboutSection" id="about">
      <div className="aboutContainer">
        <div className="aboutGrid">
          <div className="aboutImageWrapper">
            <img src={aboutImg} alt="About Us" className="aboutImage" />
          </div>
          <div className="aboutContent">
            <h2 className="aboutSubtitle">Our Mission</h2>
            <h3 className="aboutTitle">Built for Students, by Students</h3>
            <p className="aboutText">
              The <strong>Digital Archive</strong> project started as a final year initiative to solve a common problem: the loss of important academic and personal digital assets over time.
            </p>
            <p className="aboutText">
              Our goal is to provide a simple, approachable, and secure platform where anyone can preserve their digital legacy without needing complex technical knowledge.
            </p>
            
            <h2 className="aboutSubtitle">Values</h2>
            <p className="aboutText">
              What started as a classroom project is growing into a community resource. We envision a world where no student has to worry about losing their hard-earned research or precious memories to a corrupted hard drive or a forgotten password.
            </p>

            <div className="aboutStats">
              <div className="statItem">
                <span className="statNumber">100%</span>
                <span className="statLabel">Secure</span>
              </div>
              <div className="statItem">
                <span className="statNumber">Free</span>
                <span className="statLabel">For Students</span>
              </div>
              <div className="statItem">
                <span className="statNumber">24/7</span>
                <span className="statLabel">Access</span>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default About;












