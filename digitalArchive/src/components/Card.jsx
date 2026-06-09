import React from 'react';

const Card = ({ title, description, badge, fileSize, fileType, downloads, onClick }) => {
  return (
    <div className="fileCard" onClick={onClick}>
      <div className="fileCardIcon">
        {fileType === 'PDF' ? '📄' : fileType === 'PPTX' || fileType === 'PPT' ? '📊' : '📝'}
      </div>
      <div className="fileCardContent">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 className="fileCardTitle">{title}</h4>
          {badge && (
            <span style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '12px',
              backgroundColor: badge === 'Past Question' ? '#fef3c7' : '#ede9fe',
              color: badge === 'Past Question' ? '#d97706' : '#7c3aed',
              fontWeight: '600'
            }}>
              {badge}
            </span>
          )}
        </div>
        <p className="fileCardDescription">{description}</p>
        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
          {fileSize && <span>📦 {fileSize}</span>}
          {downloads !== undefined && <span>⬇️ {downloads} downloads</span>}
        </div>
      </div>
    </div>
  );
};

export default Card;
