import React from 'react'

const GameOver = ({ progress, handleBackClick }) => {
  return (
    <div className="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex justify-center items-center">
        <div className=" bg-green-600 border-2 border-gray-300 rounded-md shadow-md p-4 mt-5 text-center alert-card">
            <h2 className="text-2xl mb-2">Game Over</h2>
            <p className="text-lg mb-4">Progress: {progress}</p>
            <button className="bg-blue-500 text-black border-none rounded-md px-4 py-2 text-base cursor-pointer Back" onClick={handleBackClick}>
                Back To Start
            </button>
        </div>
    </div>
  )
}

export default GameOver