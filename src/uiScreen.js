import React, { useState, useEffect, useRef } from 'react';
import ReactImageZoom from 'react-image-zoom';
import ProgressBar from '@ramonak/react-progress-bar';
import './index.css';
import './eyes.css';

const BoxContainer = () => {
  const [timer, setTimer] = useState(10);
  const [moves, setMoves] = useState(5);
  const [progress, setProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('start');
  const [previousScreen, setPreviousScreen] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const eyeContainerRef = useRef(null);
  const [eyeRotation, setEyeRotation] = useState(0);

  //emojis for taps
  let emoji = '😃';
  let emojiColor = null;

  if (moves === 5) emoji = '😃';
  else if (moves === 4) emoji = '😜';
  else if (moves === 3) emoji = '😅';
  else if (moves === 2) emoji = '😳';
  else if (moves === 1) emoji = '😔';

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

  const handleTimerShake = () => {
    const timerElement = document.querySelector('.timer');
    timerElement.classList.add('shake');

    setTimeout(() => {
      timerElement.classList.remove('shake');
    }, 1000);
  };

  useEffect(() => {
    if (timer <= 5 && timer > 0) {
      handleTimerShake();
    }
  }, [timer]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const eyeContainer = eyeContainerRef.current;
      if (eyeContainer) {
        const eyeBounds = eyeContainer.getBoundingClientRect();
        const eyeCenterX = eyeBounds.left + eyeBounds.width / 2;
        const eyeCenterY = eyeBounds.top + eyeBounds.height / 2;
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
    <div className="flex flex-col items-center h-screen w-screen flex-grow rounded-lg shadow-lg bg-purple-950 justify-center md:justify-start ">
      {currentScreen === 'start' && (
        // StartScreen component
        <div className="flex flex-col items-center justify-center h-full start-screen">
          <h1 className="text-white text-5xl font-bold">Ayy Eye!</h1>
          <div className="flex flex-col items-center mt-20 start-buttons">
            <Button className="p-10 px-20 bg-pink-400 rounded-10 mt-10 rules md:text-lg" onClick={handleRulesClick}>
              ❓ Rules
            </Button>
            <Button className="bg-purple-600 text-white shadow-lg mt-10 start-game md:text-lg" onClick={handleStartGame} glitch>
              Start Game
            </Button>
          </div>
        </div>
      )}

      {currentScreen === 'game' && (
        <>
          <section className="move-area">
          <div ref={eyeContainerRef} className="flex justify-center items-center flex-1 h-full">

          <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
              <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
            </div>
          </section>
          <div className="buttonContainer flex flex-col justify-evenly w-full px-8 pt-10">
            <div className="top-buttons flex justify-between w-full pb-6">
              <Button className="text-white bg-red-500 rounded-md w-32 quit" onClick={handleBackClick}>
                ✌️ Quit
              </Button>
              <Button className="text-white bg-purple-300 rounded-md w-32 rules" onClick={handleRulesClick}>
                ❓ Rules
              </Button>
            </div>
            <div className="timerButtons flex justify-between w-full pb-6">
              <ProgressBar
                className="bg-gradient-to-r from-green-400 via-green-600 to-transparent bg-repeat-x bg-size-4 rounded-md w-32"
                customLabel={emoji}
                completed={moves}
                minCompleted={0}
                maxCompleted={5}
              />
              <Button
                className={`text-white bg-blue-400 rounded-md w-32 timer ${timer <= 5 && timer > 0 ? 'shake' : ''}`}
                onClick={() => console.log('Timer button clicked')}
              >
                {timer <= 0 ? 'Time Up' : ` ${timer}s`} ⏰
              </Button>
            </div>
          </div>

          <div className="boxesContainer flex flex-col justify-evenly items-center w-full p-10 md:flex-row ">
            <div className="box w-300 h-300 m-10 bg-bb006d rounded-10 shadow-2xl">
              <div onClick={handleImageClick}>
                <ReactImageZoom
                  width={300}
                  height={300}
                  zoomWidth={100}
                  img={process.env.PUBLIC_URL + '/croc1.jpg'}
                  zoomStyle="z-index: 1000; position: absolute; top: 20px; bottom: 30px; left: 10px; border-radius: 100%; overflow: hidden;"
                />
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
            <div className="box w-300 h-300 m-10 bg-bb006d rounded-10 shadow-2xl">
              <div onClick={handleImageClick}>
                <ReactImageZoom
                  width={300}
                  height={300}
                  zoomWidth={50}
                  img={process.env.PUBLIC_URL + '/croc2.jpg'}
                  zoomStyle="z-index: 1000; position: absolute; top: 20px; bottom: 30px; left: 10px; border-radius: 100%; overflow: hidden;"
                />
                {clickedCoordinates.map((coordinate, index) => {
                  if (coordinate.imageId === 'image2') {
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

          <div className="buttonContainer flex flex-col justify-evenly w-full px-8 pt-10">
            <div className="bottom-buttons flex justify-between w-full px-8 pt-6 md:justify-start">
              <ProgressBar
                className="bg-gradient-to-r from-green-400 via-green-600 to-transparent bg-repeat-x bg-size-4 rounded-full w-full"
                customLabel="🏆"
                completed={progress}
                minCompleted={0}
                maxCompleted={5}
              />
            </div>
          </div>
        </>
      )}

      {currentScreen === 'game' && gameOver && (
        <div className="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className=" bg-green-600 border-2 border-gray-300 rounded-md shadow-md p-4 mt-5 text-center alert-card">
            <h2 className="text-2xl mb-2">Game Over</h2>
            <p className="text-lg mb-4">Progress: {progress}</p>
            <button className="bg-blue-500 text-black border-none rounded-md px-4 py-2 text-base cursor-pointer Back" onClick={handleBackClick}>
              Back To Start
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'rules' && (
        <div className="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-gray-500 border-2 border-gray-300 rounded-md shadow-md p-4 mt-5 text-center">
            <h1 className="text-2xl mb-2"> 📌Game Rules</h1>
            <p className="text-lg mb-4">👆Zoom and scroll the image to find the differences.</p>
            <p className="text-lg mb-4">🎯You have 5 taps. Use them wisely!</p>
            <p className="text-lg mb-4">⏰Whoever finds the most differences in 10 seconds, wins the round!</p>
            <button className="bg-blue-500 text-black border-none rounded-md px-4 py-2 text-base cursor-pointer button back" onClick={handleBackClick}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Button = ({ onClick, children, className, glitch }) => {
  return (
    <button
      className={`relative p-4 px-8 bg-gradient-to-r from-purple-500 to-purple-800 hover:from-purple-300 hover:to-purple-950 text-white text-sm font-semibold uppercase tracking-wide rounded-md shadow-lg overflow-hidden ${className} ${glitch ? 'glitch-animation' : ''}`}
      onClick={onClick}
    >
      {children}
      <span></span>
    </button>
  );
};

export default BoxContainer;
