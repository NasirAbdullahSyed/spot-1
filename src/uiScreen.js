import React, { useState, useEffect } from 'react';
import ReactImageZoom from 'react-image-zoom';
import './BoxContainer.css';

const BoxContainer = () => {
  const [timer, setTimer] = useState(10);
  const [moves, setMoves] = useState(5);
  const [progress, setProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('start');
  const [previousScreen, setPreviousScreen] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState([]);

  useEffect(() => {
    let intervalId;

    if (currentScreen === 'game' && timer > 0 && moves > 0 && !gameOver) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
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
        { x: offsetX, y: offsetY, imageId: 'image2' }
      ];
  
      setClickedCoordinates((prevCoordinates) => [...prevCoordinates, ...newCoordinates]);
    }
  };
  
  
  
  
  return (
    <div className="container">
      {currentScreen === 'start' && (
        <StartScreen onStartGame={handleStartGame} onRulesClick={handleRulesClick} />
      )}

      {currentScreen === 'game' && (
        <>
          <div className="buttonContainer">
            <div className="top-buttons">
              <Button className="quit" onClick={handleBackClick}>
                Quit
              </Button>
              <Button className="rules" onClick={handleRulesClick}>
                Rules
              </Button>
            </div>

            <div className="timerButtons">
              <Button className="moves" onClick={() => console.log('Moves button clicked')}>
                Moves: {moves}
              </Button>
              <Button className="timer" onClick={() => console.log('Timer button clicked')}>
                Timer: {timer}s
              </Button>
            </div>
          </div>

          <div className="boxesContainer">
            <div className="box">
              <div onClick={(event) => handleImageClick(event, 'image1')}>
                <ReactImageZoom
                  width={300}
                  height={300}
                  zoomWidth={400}
                  img={process.env.PUBLIC_URL + '/croc1.jpg'}
                  zoomStyle={`z-index: 1000; position: absolute; bottom: 70%; top: 0; transform: translateX(10px);`}
                />
                {clickedCoordinates.map((coordinate, index) => {
                  if (coordinate.imageId === 'image1') {
                    return (
                      <div key={index} className="circle" style={{ left: coordinate.x, top: coordinate.y }} />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
            <div className="box">
              <div onClick={(event) => handleImageClick(event, 'image2')}>
                <ReactImageZoom
                  width={300}
                  height={300}
                  zoomWidth={400}
                  img={process.env.PUBLIC_URL + '/croc2.jpg'}
                  zoomStyle={`z-index: 1000; position: absolute; bottom: 70%; top: 0; transform: translateX(10px);`}
                />
                {clickedCoordinates.map((coordinate, index) => {
                  if (coordinate.imageId === 'image2') {
                    return (
                      <div key={index} className="circle" style={{ left: coordinate.x, top: coordinate.y }} />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          <div className="buttonContainer">
            <div className="bottom-buttons">
              <Button className="button progress" onClick={() => console.log('Progress button clicked')}>
                Progress: {progress}
              </Button>
            </div>
          </div>
        </>
      )}

      {currentScreen === 'rules' && <RulesScreen onBackClick={handleBackClick} />}

      {gameOver && (
        <div className="overlay">
          <div className="alert-card">
            <h2>Game Over</h2>
            <p>Progress: {progress}</p>
            <button className="button" onClick={handleBackClick}>
              Back To Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StartScreen = ({ onStartGame, onRulesClick }) => {
  return (
    <div className="start-screen">
      <h1>Ayy Eye!</h1>
      <div className="start-buttons">
        <Button className="rules" onClick={onRulesClick}>
          Rules
        </Button>
        <Button className="start-game" onClick={onStartGame}>
          Start Game
        </Button>
      </div>
    </div>
  );
};

const RulesScreen = ({ onBackClick }) => {
  return (
    <div>
      <h2>Game Rules</h2>
      <p>Write the rules for the game here.</p>
      <button className="button back" onClick={onBackClick}>
        Back
      </button>
    </div>
  );
};

const Button = ({ onClick, children, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default BoxContainer;
