import React, { useEffect, useState } from 'react';
import { navigate } from '../utils/MultiplayerReactRouter';
import './screen.css';

const LoadScreen = ({ preloadImages }) => {

  

  return (
    <div>
        <div data-glitch="Loading..." className="custom-glitch" onLoad={preloadImages()}>
            Loading...
        </div>  
    </div>

  );
};

export default LoadScreen;
