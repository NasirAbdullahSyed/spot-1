import React from 'react'
import '../../index.css'

const RulesScreen = ({ handleBackClick }) => {
  return (
    <div className="overlay fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-[#ff184c] opacity-70 border-2 border-[#fded00] rounded-md shadow-md p-4 mt-5 text-center">
            <h1 className="text-2xl mb-2 text-[#fded00] font-ps2p"> 🎗️Game Rules</h1>
            <p className="text-lg mb-4 ">👆Zoom and scroll the image to find the differences.</p>
            <p className="text-lg mb-4">🎯You have 5 taps. Use them wisely!</p>
            <p className="text-lg mb-4">⏰Whoever finds the most differences in 10 seconds, wins the round!</p>
            <button className="bg-[#fded00] font-ps2p text-black border-none rounded-md px-4 py-2 text-base cursor-pointer button back" onClick={handleBackClick}>
                Back
            </button>
        </div>
    </div>
  )
}

export default RulesScreen