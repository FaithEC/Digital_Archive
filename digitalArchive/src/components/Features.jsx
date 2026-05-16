import React from 'react';

const Features = () => {
  const featuresList = [
    {
      title: 'Secure Storage',
      description: 'Your digital assets are protected with industry-standard encryption and secure cloud storage.',
      icon: '🔒'
    },
    {
      title: 'Easy Organization',
      description: 'Categorize and tag your files effortlessly to keep your archive neat and accessible.',
      icon: '📁'
    },
    {
      title: 'Quick Search',
      description: 'Find exactly what you need in seconds with our powerful built-in search functionality.',
      icon: '🔍'
    }
  ];

  return (
    <section className="featuresSection">
      <div className="featuresContainer">
        <div className="featuresHeader">
          <h2 className="featuresSubtitle">Everything you need</h2>
          <p className="featuresTitle">Better way to manage your archive</p>
          <p className="featuresDescription">
            Digital Archive provides all the tools you need to preserve your important documents and media in one place.
          </p>
        </div>

        <div className="featuresGrid">
          {featuresList.map((feature, index) => (
            <div key={index} className="featureCard">
              <div className="featureIconWrapper">
                <span className="featureIcon">{feature.icon}</span>
              </div>
              <h3 className="featureName">{feature.title}</h3>
              <p className="featureText">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
