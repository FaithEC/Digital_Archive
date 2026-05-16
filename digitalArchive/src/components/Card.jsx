import React from 'react';

const Card = ({ title, description, onClick }) => {
  return (
    <div className="fileCard" onClick={onClick}>
      <div className="fileCardIcon">📄</div>
      <div className="fileCardContent">
        <h4 className="fileCardTitle">{title}</h4>
        <p className="fileCardDescription">{description}</p>
      </div>
    </div>
  );
};

export default Card;
