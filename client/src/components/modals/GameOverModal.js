import '../../index.css'

import React from 'react'

const GameOverModal = ({ progress, handleBackClick }) => {
  return (
    <div className="overlay fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className=" bg-[#ff184c] border-2 border-[#fded00] rounded-md shadow-md p-4 mt-5 text-center alert-card">
            <h2 className="text-2xl mb-2 font-ps2p">Game Over</h2>
            <p className="text-lg mb-4 font-ps2p">Progress: {progress}</p>
            <button className="bg-[#fded00] font-ps2p text-black border-none rounded-md px-4 py-2 text-base cursor-pointer Back" onClick={handleBackClick}>
                Back To Start
            </button>
        </div>
    </div>
  )
}

export default GameOverModal