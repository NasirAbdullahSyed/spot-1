import React from 'react'
import StaticButton from '../buttons/StaticButton'



const StartScreen = ({ handleRulesClick, handleStartGame }) => {

  return (
    <div className="flex flex-col items-center justify-center">
        <div className='text-white font-ps2p text-6xl sm:text-9xl'>
          spot
        </div>
        <div className="flex flex-col mt-28 sm:flex-row">
          <StaticButton
            onClick={handleStartGame}
            text="START"
          />
          <StaticButton
            onClick={handleRulesClick}
            text="Rules"
        />
        </div>
    </div>
  )
}

export default StartScreen