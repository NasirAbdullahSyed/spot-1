import React, { useEffect, useMemo, useRef, useState } from 'react';

// Components
// --Modals
import GameOverModal from '../components/modals/GameOverModal';
import RulesModal from '../components/modals/RulesModal';
// --Buttons
import StaticButton from '../components/buttons/StaticButton'

import ProgressBar from "@ramonak/react-progress-bar";
import { navigate } from '../utils/MultiplayerReactRouter';
import Game from '../components/Game';

const GameProgress = ({progress, totalProgress=6}) => {
  return (
    <ProgressBar
      bgColor='#cc133c'
      baseBgColor='#fded00'
      height='2rem'
      width='90vw'
      labelSize='1rem'
      className="mt-[1rem] overflow-hidden"
      customLabel="🏆"
      completed={progress}
      minCompleted={0}
      maxCompleted={totalProgress}
    />
  )
}

const HealthBar = ({health, totalHealth=10}) => {
  //emojis for taps
  const emoji = useMemo(() => {
    switch (health) {
      case 0:
        return "💀";
      case 1:
        return "😔";
      case 2:
        return "😳";
      case 3:
        return "😅";
      case 4:
        return "😜";
      case 5:
        return "🤩";
      case 6:
        return "😎";
      case 7:
        return "🤓";
      case 8:
        return "🤯";
      case 9:
        return "🥳";
      default:
        return "😃";
    }
  }, [health]);
  
  return (
    <ProgressBar
        bgColor='#cc133c'
        baseBgColor='#fded00'
        height='2rem'
        width='38vw'
        labelSize='1rem'
        className="w-[7rem] mt-[1.5rem]"
        customLabel={emoji}
        completed={health}
        minCompleted={0}
        maxCompleted={totalHealth}
      />
  )
}

const Countdown = ({timer}) => {
  return (
    <StaticButton 
      className={`timer`}
      text={`${timer <= 0 ? 'OVER' : `⏰ ${timer}`}`}
      extraClasses={"h-9"}
    />
  )
}

// const GooglyEyes = () => {
//   const eyeContainerRef = useRef(null);
//   const [eyeRotation, setEyeRotation] = useState(0);

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       const eyeContainer = eyeContainerRef.current;
//       if (eyeContainer) {
//         const eyeBounds = eyeContainer.getBoundingClientRect();
//         const eyeCenterX = eyeBounds.left + eyeBounds.width / 20;
//         const eyeCenterY = eyeBounds.top + eyeBounds.height / 20;
//         const rad = Math.atan2(event.clientX - eyeCenterX, event.clientY - eyeCenterY);
//         const deg = (rad * (180 / Math.PI) * -1) + 180;
//         setEyeRotation(deg);
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <div ref={eyeContainerRef} className="flex justify-center items-center flex-1 h-full">
//       <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
//       <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
//     </div>
//   )
// }

const InGameScreen = ({ sizes, spots, images }) => {

  const [currentLevel, setCurrentLevel] = useState(0);
  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(6);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const img = [];
  
  img.push(images[currentLevel]);
  img.push(images[currentLevel+sizes.length]);
  const totalLevels = sizes.length;
  
  useEffect(() => {
    setGameOver(false);
    if (currentLevel === totalLevels) {
      setGameOver(true);
    } else if (currentLevel < totalLevels) {
      if (currentLevel === 0) {
        setTimer(40);  
      } else if (currentLevel === 1) {
        setTimer(30);
      } else if (currentLevel === 2) {
        setTimer(20);
      } else if (currentLevel === 3) {
        setTimer(10);
      }
      setMoves(10);
      setProgress(0);
      setScore(0);
      setGameOver(false);
    }
  }, [currentLevel, totalLevels])

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

  const handleCorrectClick = () => {
    setScore((prevScore) => prevScore + 1);
    setMoves((prevMoves) => Math.max(prevMoves - 1, 0));
    setProgress((prevProgress) => prevProgress + 1);
  };

  const handleWrongClick = () => {
    setMoves((prevMoves) => Math.max(prevMoves - 1, 0));
  };

  const handleNextLevel = () => {
    setCurrentLevel((prevLevel) => prevLevel + 1);
  }

  const isLastLevel = totalLevels;
  const gameOverText = isLastLevel ? "Game Over" : "Level Over";

  return (
          <div className='w-screen h-screen'>
            <div className='flex flex-row justify-center text-white mt-2 text-xl'>
              level {currentLevel + 1}
            </div>
            <div className='flex flex-row justify-evenly'>
              <div className='ml-5'>
                <StaticButton 
                  onClick={() => navigate("/")}
                  text="Quit"
                  extraClasses={"h-9"}
                />
              </div>
              <div className='mr-5'>
                <StaticButton 
                    onClick={() => setShowRulesModal(true)}
                    text="Rules"
                    extraClasses={"h-9"}
                />
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='ml-5'>
                <HealthBar health={moves}/>
              </div>
              <div className='mr-5'>  
                <Countdown timer={timer} />
              </div>
            </div>
            <Game
              gameOver={gameOver}
              onCorrectClick={handleCorrectClick}
              onWrongClick={handleWrongClick}

              // onClick={() => {
              //     setMoves((prevMoves) => Math.max(prevMoves - 1, 0));
              //     setProgress((prevProgress) => prevProgress + 1);
              // }}
              sizes={sizes[currentLevel]}
              spots={spots[currentLevel]}
              images={img}
            />
            <div className='flex justify-center items-center'>
              <div className=''>
                <GameProgress progress={progress} />
              </div>
            </div>
            {gameOver && (
              <GameOverModal
                progress={score}
                handleBackClick={() => navigate("/")}
                isLastLevel={isLastLevel}
                handleNextLevelClick={handleNextLevel}
                gameOverText={gameOverText}
              />
            )}
            {showRulesModal && (
              <RulesModal
                handleBackClick={() => setShowRulesModal(false)}
                closeOnClickOutside
              />
            )}
          </div>
  );
};
export default InGameScreen;