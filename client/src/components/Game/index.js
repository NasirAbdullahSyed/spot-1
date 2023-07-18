// Core game mechanics

import { useState } from "react";

const Game = ({onCorrectClick, onWrongClick, onClick, gameOver }) => {
  const [clickedCoordinates, setClickedCoordinates] = useState([]);  

    const handleImageClick = (event) => {
        if (!gameOver) {
          const offsetX = event.clientX;
          const offsetY = event.clientY;
    
          onClick && onClick(event)
    
          const newCoordinates = [
            { x: offsetX, y: offsetY, imageId: 'image1' },
            { x: offsetX, y: offsetY, imageId: 'image2' },
          ];
    
          setClickedCoordinates((prevCoordinates) => [...prevCoordinates, ...newCoordinates]);
        }
      };
    return (
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
    )
}

export default Game;