import { useState, useEffect } from "react";

const Game = ({ onCorrectClick, onWrongClick, gameOver, spots, images, sizes }) => {
  const [clickedCoordinates, setClickedCoordinates] = useState([]);

  useEffect(() => {
    setClickedCoordinates([]);
  }, [gameOver])
  
  const isInSpot = (x, y, spots) => {
    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
      const { x: spotX, y: spotY, width, height } = spot;

      if (x >= spotX && x <= spotX + width && y >= spotY && y <= spotY + height) {
        // remove the spot from the array
        spots.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  const handleImageClick = (event) => {
    if (!gameOver) {
      const clientWidth = document.getElementById('img1').clientWidth;
      const clientHeight = document.getElementById('img1').clientHeight;

      const scaleX = sizes[0] / clientWidth;
      const scaleY = sizes[1] / clientHeight;

      let currentTargetRect = event.currentTarget.getBoundingClientRect();
      const event_offsetX = scaleX * (event.pageX - currentTargetRect.left);
      const event_offsetY = scaleY * (event.pageY - currentTargetRect.top);

      if (isInSpot(event_offsetX, event_offsetY, spots)) {
        const newCoordinates = [{ x: event.clientX, y: event.clientY, imageId: 'image1' }];
        setClickedCoordinates(newCoordinates);
        onCorrectClick();
      } else {
        onWrongClick();
      }
    } else {
      setClickedCoordinates([]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center md:flex-row">
      <div className="mt-[0.25rem] w-[90%]">
        <div id="img1" onClick={(event) => handleImageClick(event)}>
          <img src={images[0]} className="rounded-lg border-[#8d99ae] border-4"></img>
          {clickedCoordinates.map((coordinate, index) => {
            if (coordinate.imageId === 'image1') {
              return (
                <div
                  key={index}
                  className="absolute w-12 h-12 border-2 border-green-400 rounded-full"
                  style={{ left: coordinate.x, top: coordinate.y, transform: 'translate(-50%, -50%)' }}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="mt-[0.25rem] w-[90%]">
        <div onClick={(event) => handleImageClick(event)}>
          <img src={images[1]} className="border-4 rounded-lg border-[#8d99ae]"></img>
          {clickedCoordinates.map((coordinate, index) => {
            if (coordinate.imageId === 'image2') {
              return (
                <div
                  key={index}
                  className="absolute left-0 top-0 w-10 h-10 border-2 border-green-400 rounded-full pointer-events-none transform-translate-x-[-50%] transform-translate-y-[-50%] circle"
                  style={{ left: coordinate.x, top: coordinate.y, transform: 'translate(-50%, -50%)' }}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Game;
