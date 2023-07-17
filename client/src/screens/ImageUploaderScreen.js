import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageRef, storage } from '../firebase/firebase';

import axios from 'axios';
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [originalImageURL, setOriginalImageURL] = useState(null);
  const [modifiedImageURL, setModifiedImageURL] = useState(null);

  const handleImageUpload = async() => 
  {
    if (selectedImage) {
      
      // Ref Path
      const storageRef = ref(storage, imageRef);
      const imageRefPath = ref(storageRef, selectedImage.name);
      
      // Upload image
      await uploadBytes(imageRefPath, selectedImage);
      
      // Get Download URL for image
      const imageURL1 = await getDownloadURL(imageRefPath);
      setOriginalImageURL(imageURL1);
      
      // Process image
      const response = await axios.post('/process-image', {
        originalImageURL: imageURL1,
        originalImageName: selectedImage.name,
        storageRef: storageRef,
      });
          
      // Upload Processed Image 
      const proc_image = response.data;
      uploadBytes(imageRefPath, proc_image);
      const imageURL2 = getDownloadURL(imageRefPath);
      setModifiedImageURL(imageURL2);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {modifiedImageURL && (
        <div>
          <h2>Initial Image:</h2>
          {/* <img src={modifiedImageURL} alt="Initial Image" /> */}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
