import React, { useEffect, useRef, useState } from 'react';

import GameOverModal from '../components/modals/GameOverModal';
import ProgressBar from "@ramonak/react-progress-bar";
import RulesModal from '../components/modals/RulesModal';
//import ReactImageZoom from 'react-image-zoom';
//import Zoom from 'react-img-zoom';
// Components
// --Buttons
import StaticButton from '../components/buttons/StaticButton'
import { navigate } from '../utils/MultiplayerReactRouter';
import { i } from 'maath/dist/index-43782085.esm';
import { set } from 'mongoose';

const InGameScreen = ({ spots, images }) => {
  const [timer, setTimer] = useState(10);
  const [moves, setMoves] = useState(5);
  const [progress, setProgress] = useState(0);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState([]);
  const eyeContainerRef = useRef(null);
  const [eyeRotation, setEyeRotation] = useState(0);
  
  
  // console.log("Inside Game Screen")
  // console.log(images);
  // console.log(spots);

  //emojis for taps
     let emoji = "😃";

  if(moves === 5)
    emoji = "😃";
  else if (moves === 4)
    emoji = "😜";
  else if(moves === 3)
    emoji = "😅";
  else if(moves === 2)
    emoji = "😳";
  else if(moves === 1)
    emoji = "😔";

 //display emoji with moves
  

  useEffect(() => {
    let intervalId;

    if (timer > 0 && moves > 0 && !gameOver) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0 || moves === 0) {
      setGameOver(true);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer, moves, gameOver]);

  const handleImageClick = (event) => {
    if (!gameOver) {
      const offsetX = event.clientX;
      const offsetY = event.clientY;

      setMoves((prevMoves) => Math.max(prevMoves - 1, 0));
      setProgress((prevProgress) => prevProgress + 1);

      const newCoordinates = [
        { x: offsetX, y: offsetY, imageId: 'image1' },
        { x: offsetX, y: offsetY, imageId: 'image2' },
      ];

      setClickedCoordinates((prevCoordinates) => [...prevCoordinates, ...newCoordinates]);
    }
  };

  useEffect(() => {
        const handleMouseMove = (event) => {
          const eyeContainer = eyeContainerRef.current;
          if (eyeContainer) {
            const eyeBounds = eyeContainer.getBoundingClientRect();
            const eyeCenterX = eyeBounds.left + eyeBounds.width / 20;
            const eyeCenterY = eyeBounds.top + eyeBounds.height / 20;
            const rad = Math.atan2(event.clientX - eyeCenterX, event.clientY - eyeCenterY);
            const deg = (rad * (180 / Math.PI) * -1) + 180;
            setEyeRotation(deg);
          }
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
  }, []);
  

  return (
          <div className='w-screen h-screen'>
            <div className='flex flex-row justify-evenly'>
              <div className='ml-5'>
                <StaticButton 
                  onClick={() => navigate("/")}
                  text="Quit"
                  extraClasses={'w-[7rem] h-[3rem] sm:w-[10rem] sm:h-[4rem]'}
                />
              </div>
              <div className='mr-5'>
                <StaticButton 
                    onClick={() => setShowRulesModal(true)}
                    text="Rules"
                    extraClasses={'w-[7rem] h-[3rem] sm:w-[10rem] sm:h-[4rem]'}
                />
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='ml-5'>
                <ProgressBar
                  bgColor='#cc133c'
                  baseBgColor='#fded00'
                  height='3rem'
                  width='30vw'
                  labelSize='2rem'
                  className="w-[7rem] mt-[1.5rem]"
                  customLabel={emoji}
                  completed={moves}
                  minCompleted={0}
                  maxCompleted={5}
                />
              </div>
              <div className='mr-5'>  
                <StaticButton 
                    className={` timer ${timer <= 5 && timer > 0 ? 'shake' : ''}`} 
                    onClick={() => console.log('Timer button clicked')}
                    text={`${timer <= 0 ? 'OVER' : `⏰ ${timer}`}`}    
                    extraClasses={'w-[7rem] h-[3rem] sm:w-[10rem] sm:h-[4rem]'}
                />
              </div>
            </div>
            {/* <div className='flex justify-between '>
              <div ref={eyeContainerRef} className="flex justify-center items-center flex-1 h-full">
                <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
                <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
              </div>
            </div> */}
            <div className="flex flex-col justify-center items-center md:flex-row ">
              <div className="mt-5 w-[98%] ">
                  <div onClick={(event) => handleImageClick(event)}>
                      <img src='https://res.cloudinary.com/dbjuk1r7a/image/upload/v1689443537/processed_R.jpg.png' className='rounded-lg border-[#fded00] border-4'></img>
                      {clickedCoordinates.map((coordinate, index) => {
                        if (coordinate.imageId === 'image1') {
                          return (
                              <div
                                  key={index}
                                  className="absolute left-0 top-0 w-10 h-10 border-2 border-green-400 rounded-full pointer-events-none transform-translate-x-[-50%] transform-translate-y-[-50%] circle"
                                  style={{ left: coordinate.x, top: coordinate.y }}
                              />
                          );
                        }
                        return null;
                      })}
                  </div>
              </div>
              <div className="mt-5 w-[98%] ">
                  <div onClick={(event) => handleImageClick(event)}>
                      <img src='https://res.cloudinary.com/dbjuk1r7a/image/upload/v1689443537/processed_R.jpg.png' className='border-4 rounded-lg border-[#fded00]'></img>
                      {clickedCoordinates.map((coordinate, index) => {
                        if (coordinate.imageId === 'image1') {
                          return (
                              <div
                                  key={index}
                                  className="absolute left-0 top-0 w-10 h-10 border-2 border-green-400 rounded-full pointer-events-none transform-translate-x-[-50%] transform-translate-y-[-50%] circle"
                                  style={{ left: coordinate.x, top: coordinate.y }}
                              />
                          );
                        }
                        return null;
                      })}
                  </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className=''>
                <ProgressBar
                  bgColor='#cc133c'
                  baseBgColor='#fded00'
                  height='3rem'
                  width={['90vw']}
                  labelSize='2rem'
                  className="mt-[1.5rem] overflow-hidden"
                  customLabel="🏆"
                  completed={progress}
                  minCompleted={0}
                  maxCompleted={5}
                />
              </div>
            </div>
            {gameOver && (
              <GameOverModal
                progress={progress}
                handleBackClick={() => navigate("/")}
              />
            )}
            {showRulesModal && (
              <RulesModal
                handleBackClick={() => setShowRulesModal(false)}
              />
            )}
          </div>
  );
};
export default InGameScreen;