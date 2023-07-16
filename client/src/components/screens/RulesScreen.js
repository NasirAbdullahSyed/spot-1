import React from 'react'

const RulesScreen = ({ handleBackClick }) => {
  return (
    <div className="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center">
        <div className="bg-gray-500 border-2 border-gray-300 rounded-md shadow-md p-4 mt-5 text-center">
            <h1 className="text-2xl mb-2"> 📌Game Rules</h1>
            <p className="text-lg mb-4">👆Zoom and scroll the image to find the differences.</p>
            <p className="text-lg mb-4">🎯You have 5 taps. Use them wisely!</p>
            <p className="text-lg mb-4">⏰Whoever finds the most differences in 10 seconds, wins the round!</p>
            <button className="bg-blue-500 text-black border-none rounded-md px-4 py-2 text-base cursor-pointer button back" onClick={handleBackClick}>
                Back
            </button>
        </div>
    </div>
  )
}

export default RulesScreen