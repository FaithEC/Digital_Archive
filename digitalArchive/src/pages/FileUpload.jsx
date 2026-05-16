import React, { useState } from 'react';
import Card from '../components/Card.jsx';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    setUploadedFiles(prev => [...prev, ...files]);
    setFiles([]);
    alert('Files uploaded successfully!');
  };

  return (
    <section className="uploadSection">
      <div className="uploadContainer">
        <h3 className="uploadTitle">Upload to Archive</h3>
        
        <div className="uploadInputWrapper">
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange} 
            className="fileInput"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="fileInputLabel">
            {files.length > 0 ? `${files.length} files selected` : 'Choose files to upload'}
          </label>
          <button 
            onClick={handleUpload} 
            disabled={files.length === 0}
            className="btnUpload"
          >
            Upload Now
          </button>
        </div>

        {files.length > 0 && (
          <div className="pendingSection">
            <h4 className="sectionLabel">Files to upload:</h4>
            <ul className="pendingList">
              {files.map((file, index) => (
                <li key={index} className="pendingItem">{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="uploadedSection">
            <h4 className="sectionLabel">Your Archived Files:</h4>
            <div className="cardsContainer">
              {uploadedFiles.map((file, index) => (
                <Card
                  key={index}
                  title={file.name}
                  description={`Size: ${(file.size / 1024).toFixed(2)} KB`}
                  onClick={() => alert(`Viewing ${file.name}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FileUpload;
