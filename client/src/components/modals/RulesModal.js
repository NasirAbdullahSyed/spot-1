import '../../index.css'

import React from 'react'

const RulesModal = ({ handleBackClick, closeOnClickOutside }) => {
  return (
    <div className="overlay bg-[#00000080] backdrop-blur-md fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 px-8" onClick={closeOnClickOutside ? handleBackClick : () => {}}>
        <div className="bg-[#ff184c] opacity-70 border-2 border-[#8d99ae] rounded-md shadow-md p-4 mt-5 text-center">
            <h1 className="text-2xl mb-2 text-[#8d99ae] font-ps2p"> 🎗️ Game Rules</h1>
            <p className="text-lg mb-4 ">👆 Zoom and scroll the image to find the differences.</p>
            <p className="text-lg mb-4">🎯 You have 5 taps. Use them wisely!</p>
            <p className="text-lg mb-4">⏰ Whoever finds the most differences in 10 seconds, wins the round!</p>
            <button className="bg-[#8d99ae] font-ps2p text-black border-none rounded-md px-4 py-2 text-base cursor-pointer button back" onClick={handleBackClick}>
                Back
            </button>
        </div>
    </div>
  )
}

export default RulesModal