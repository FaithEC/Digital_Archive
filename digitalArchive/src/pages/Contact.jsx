import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contactSection">
      <div className="contactContainer">
        <div className="contactHeader">
          <h2 className="contactSubtitle">Get in Touch</h2>
          <h3 className="contactTitle">Contact Us</h3>
          <p className="contactDescription">
            Have questions or feedback about the Digital Archive? We'd love to hear from you.
          </p>
        </div>

        <div className="contactGrid">
          <div className="contactInfo">
            <div className="infoItem">
              <span className="infoIcon">📍</span>
              <div>
                <h4 className="infoLabel">Location</h4>
                <p className="infoText">Edo State University, Computer Science Dept.</p>
              </div>
            </div>
            <div className="infoItem">
              <span className="infoIcon">📧</span>
              <div>
                <h4 className="infoLabel">Email</h4>
                <p className="infoText">support@digitalarchive.edu</p>
              </div>
            </div>
            <div className="infoItem">
              <span className="infoIcon">📞</span>
              <div>
                <h4 className="infoLabel">Phone</h4>
                <p className="infoText">+234 123 456 7890</p>
              </div>
            </div>
          </div>

          <form className="contactForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="name" className="formLabel">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="formInput"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email" className="formLabel">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="formInput"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="subject" className="formLabel">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="formInput"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="message" className="formLabel">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="formTextarea"
                required
              ></textarea>
            </div>
            <button type="submit" className="btnSubmit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
