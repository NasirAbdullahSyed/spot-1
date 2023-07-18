import '../../index.css'

import React from 'react'

const GameOverModal = ({ score, handleBackClick, isLastLevel, handleNextLevel, gameOverText }) => {
  return (
    <div className="overlay fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className=" bg-[#ff184c] border-2 border-[#fded00] rounded-md shadow-md p-4 mt-5 text-center alert-card">
            <h2 className="text-2xl mb-2 font-ps2p">{gameOverText}</h2>
            <p className="text-lg mb-4 font-ps2p">Score: {score}</p>
            <div className='flex flex-col gap-4 sm:flex-row justify-evenly'>
              <button className="bg-[#fded00] hover:scale-105 font-ps2p text-black border-none rounded-md px-4 py-2 text-base cursor-pointer Back" onClick={handleBackClick}>
                  Back To Start
              </button>
              {!isLastLevel && (
                <button className="bg-[#fded00] hover:scale-105 font-ps2p text-black border-none rounded-md px-4 py-2 text-base cursor-pointer Back" onClick={handleNextLevel}>
                  Next Level
                </button>
              )}
            </div>
        </div>
    </div>
  )
}

export default GameOverModal