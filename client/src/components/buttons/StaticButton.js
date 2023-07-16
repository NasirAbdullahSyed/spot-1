import React from 'react'
import './button.css';

const StaticButton = ({ onClick, text, extraClasses }) => {
  const buttonClasses = `radio-wrapper ${extraClasses}`;
  return (
    <div className="container my-5">
      <div className={`${buttonClasses} h-16 w-30 sm:h-20, w-40`}>
        <button className="btn" name="btn" id="value-1" type="button" onClick={onClick}>
          <span aria-hidden="">_</span>{text}
          <span className="btn__glitch" aria-hidden=""></span>
          <label className="number"></label>
        </button>
      </div>
    </div>
  )
}

export default StaticButton
