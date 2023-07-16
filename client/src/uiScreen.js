import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import {StarsCanvas} from './Stars';
import ProgressBar from "@ramonak/react-progress-bar";
//import ReactImageZoom from 'react-image-zoom';
//import Zoom from 'react-img-zoom';
// Components
// --Buttons
import StaticButton from './components/buttons/StaticButton'
// --Screens
import StartScreen from './components/screens/StartScreen';
import GameOver from './components/screens/GameOver';
import Rules from './components/screens/RulesScreen';

const BoxContainer = () => {
  const [timer, setTimer] = useState(10);
  const [moves, setMoves] = useState(5);
  const [progress, setProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('start');
  const [previousScreen, setPreviousScreen] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState([]);
  const eyeContainerRef = useRef(null);
  const [eyeRotation, setEyeRotation] = useState(0);


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

    //re-rendering issues if using states
  // if (moves === 5) {
  //   setSelectedEmoji('😃');
  //   emojiColor = 'darkgreen';
  // } else if (moves === 4) {
  //   setSelectedEmoji('😜');
  //   emojiColor = 'lightgreen';
  // } else if (moves === 3) {
  //   setSelectedEmoji ('😅');
  //   emojiColor = 'yellow';
  // } else if (moves === 2) {
  //   setSelectedEmoji('😳');
  //   emojiColor = 'orange';
  // } else if (moves === 1) {
  //   setSelectedEmoji('🫣');
  //   emojiColor = 'red';
  // }

 //display emoji with moves
  

  useEffect(() => {
    let intervalId;

    if (currentScreen === 'game' && timer > 0 && moves > 0 && !gameOver) {
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
  }, [currentScreen, timer, moves, gameOver]);

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleRulesClick = () => {
    if (currentScreen === 'game') {
      setPreviousScreen('game');
    } else if (currentScreen === 'start') {
      setPreviousScreen('start');
    }
    setCurrentScreen('rules');
  };

  const handleBackClick = () => {
    if (currentScreen === 'rules') {
      if (previousScreen === 'start') {
        setCurrentScreen('start');
      } else if (previousScreen === 'game') {
        setCurrentScreen('game');
      }
    } else if (currentScreen === 'game') {
      if (gameOver) {
        setGameOver(false);
        setCurrentScreen('start');
        setTimer(10);
        setMoves(5);
        setProgress(0);
        setClickedCoordinates([]);
      } else {
        setCurrentScreen('start');
        setTimer(10);
        setMoves(5);
        setProgress(0);
        setClickedCoordinates([]);
      }
    }
  };

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
    <div className="h-screen w-screen flex flex-col items-center justify-center ">
      <StarsCanvas/>
      {currentScreen === 'start' && (
        // StartScreen component
        <StartScreen
          handleStartGame={handleStartGame}
          handleRulesClick={handleRulesClick}
        />
      )}

      {currentScreen === 'game' && (
        <>
          
          <div className='w-screen h-screen'>
            <div className='flex flex-row justify-evenly'>
              <div className='ml-5'>
                <StaticButton 
                  onClick={handleBackClick}
                  text="Quit"
                  extraClasses={'w-[7rem] h-[3rem] sm:w-[10rem] sm:h-[4rem]'}
                />
              </div>
              <div className='hidden sm:block text-white font-ps2p text-6xl sm:text-9xl'>
                spot
              </div>
              <div className='mr-5'>
                <StaticButton 
                    onClick={handleRulesClick}
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
            <div className='flex justify-between '>
              <div ref={eyeContainerRef} className="flex justify-center items-center flex-1 h-full">
                <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
                <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
              </div>
            </div>
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
                  height='4rem'
                  width={['90vw']}
                  labelSize='3rem'
                  className="mt-[1.5rem] overflow-hidden"
                  customLabel="🏆"
                  completed={progress}
                  minCompleted={0}
                  maxCompleted={5}
                />
              </div>
            </div>
          </div>
      </>
      )}

      {currentScreen === 'game' && gameOver && (
        <GameOver
          progress={progress}
          handleBackClick={handleBackClick}
        />
      )}

      {currentScreen === 'rules' && (
        <Rules
          handleBackClick={handleBackClick}
        />
      )}
    </div>
  );
};
export default BoxContainer;