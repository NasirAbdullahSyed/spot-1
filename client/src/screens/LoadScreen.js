import React, { useEffect, useState } from 'react';
import './screen.css';
import axios from 'axios'
import { navigate } from '../utils/MultiplayerReactRouter';

const LoadScreen = ({ setSizes, setImages, setSpots }) => {

  const preloadImages = async () => {
      // Temporary files
      const urls = [
        "https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F1.jpg?alt=media&token=08546a29-aef0-44ba-b3f7-ceda035cfb70",
        "https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F2.jpg?alt=media&token=69b596f0-dead-4bb4-9f4a-bd9e156946b0",
        "https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F3.jpg?alt=media&token=bfe6b695-3bff-4ddd-a1bb-e4431345a84b",
        "https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F4.jpg?alt=media&token=fb67d9b3-a15a-4c2b-8adf-961e0677eacb",
      ];
    
      try {
          // API fetch call
          const response = await axios.post("/process-image", {
              images: urls
          });
      
          // console.log("In Preload")
          // console.log(response.data);
          // Do something with the response data
          setSizes(response.data.sizes);
          setSpots(response.data.allSpots);
          setImages(response.data.urls);
      } catch (error) {
        console.error(error);
      }
      navigate("game")
  };

  useEffect(() => {
    preloadImages();
  }, []);
  return (
    <div>
        <div data-glitch="Loading..." className="custom-glitch text-xl sm:text-5xl" >
            Loading...
        </div>  
    </div>

  );
};

export default LoadScreen;
