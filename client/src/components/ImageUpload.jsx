import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('item');
    console.log('JWT Token:', token);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await axios.post('http://localhost:3000/api/images/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <h1>How to Upload File Using Multer</h1>
      <img src='http://localhost:3000/download/image.png' height={100} alt='Uploaded' />
      <div className="card">
        <h2>Upload File</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Upload</button>
      </div>
    </>
  );
}

export default ImageUpload;