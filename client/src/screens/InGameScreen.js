import React, { useEffect, useMemo, useRef, useState } from 'react';

// Components
// --Modals
import GameOverModal from '../components/modals/GameOverModal';
import RulesModal from '../components/modals/RulesModal';
// --Buttons
import StaticButton from '../components/buttons/StaticButton'

//import ReactImageZoom from 'react-image-zoom';
//import Zoom from 'react-img-zoom';

import ProgressBar from "@ramonak/react-progress-bar";
import { navigate } from '../utils/MultiplayerReactRouter';
import Game from '../components/Game';

const GameProgress = ({progress, totalProgress=5}) => {
  return (
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
      maxCompleted={totalProgress}
    />
  )
}

const HealthBar = ({health, totalHealth=5}) => {
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
      default:
        return "😃";
    }
  }, [health]);
  
  return (
    <ProgressBar
        bgColor='#cc133c'
        baseBgColor='#fded00'
        height='3rem'
        width='30vw'
        labelSize='2rem'
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
      className={`timer ${timer <= 5 && timer > 0 ? 'shake' : ''}`} 
      onClick={() => console.log('Timer button clicked')}
      text={`${timer <= 0 ? 'OVER' : `⏰ ${timer}`}`}    
      extraClasses={'w-[7rem] h-[3rem] sm:w-[10rem] sm:h-[4rem]'}
    />
  )
}

const GooglyEyes = () => {
  const eyeContainerRef = useRef(null);
  const [eyeRotation, setEyeRotation] = useState(0);

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
    <div ref={eyeContainerRef} className="flex justify-center items-center flex-1 h-full">
      <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
      <div className="eye" style={{ transform: `rotate(${eyeRotation}deg)` }}></div>
    </div>
  )
}

const InGameScreen = ({ spots, images }) => {
  const [timer, setTimer] = useState(10);
  const [moves, setMoves] = useState(5);
  const [progress, setProgress] = useState(0);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
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
                <HealthBar health={moves}/>
              </div>
              <div className='mr-5'>  
                <Countdown timer={timer} />
              </div>
            </div>
            <div className='flex justify-between'>
              <GooglyEyes />
            </div>
            <Game
              gameOver={gameOver}
              onClick={() => {
                  setMoves((prevMoves) => Math.max(prevMoves - 1, 0));
                  setProgress((prevProgress) => prevProgress + 1);
              }}
            />
            <div className='flex justify-center items-center'>
              <div className=''>
                <GameProgress progress={progress} />
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
                closeOnClickOutside
              />
            )}
          </div>
  );
};
export default InGameScreen;