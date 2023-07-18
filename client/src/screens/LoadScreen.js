import React, { useEffect, useState } from 'react';
import './screen.css';
import axios from 'axios'
import { navigate } from '../utils/MultiplayerReactRouter';

const LoadScreen = ({ setImages, setSpots }) => {

  const preloadImages = async () => {
      // Temporary files
      const urls = [
        "https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F1.jpg?alt=media&token=08546a29-aef0-44ba-b3f7-ceda035cfb70",
        "https://firebasestorage.googleapis.com/v0/b/spot-41cb1.appspot.com/o/samples%2F1.jpg?alt=media&token=08546a29-aef0-44ba-b3f7-ceda035cfb70"
      ];
    
      try {
          // API fetch call
          const response = await axios.post("/process-image", {
              images: urls
          });
      
          // console.log("In Preload")
          // console.log(response.data);
          // Do something with the response data
          setSpots(response.data.urls);
          setImages(response.data.allSpots);
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
        <div data-glitch="Loading..." className="custom-glitch" >
            Loading...
        </div>  
    </div>

  );
};

export default LoadScreen;
