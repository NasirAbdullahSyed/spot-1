import React, { useState, useEffect } from 'react';
import { storage, imageRef } from './firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async() => {
    if (selectedImage) {
        await uploadBytes(ref(imageRef, selectedImage.name), selectedImage);
        const downloadURL = await getDownloadURL(ref(storage, ref(imageRef, selectedImage.name).fullPath));
        console.log(downloadURL);
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
    </div>
  );
};

export default ImageUploader;
