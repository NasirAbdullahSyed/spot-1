import React from "react";
/*
This code represents the structure of the Tic Tac Toe game board, with each square being a separate component. 
The Square component handles the click events and displays the value of each square. 
The Squares component renders multiple Square components in a row. 
The BoardRows component renders multiple rows of squares.
The Boardcomponent acts as the top-level component that renders the entire game board.
*/



// Individual square of board game. In this function the xy cordinate along with the data (X,O) is passed as props.
const Square = props => {
  let { x, y, data } = props;
  let coord = `${y}${x}`;
  let square = data[coord] || { x, y };
  // console.log(square);
  let className = "square";
  if (props.winPlayer || square.value) className += " no-drop";
  //console.log(props.winPlayer, square.value);
  if (square.win) className += " win-square";
  //console.log(square.win);
  // this method checks if the square is empty and if it is empty then it will place the X or O in the square.
  const click = () => {
    if (!square.value) {
      square.value = props.nextPlayer;
      props.squareClick(coord, square);
      // console.log(coord, square);
      //console.log(props.nextPlayer);
    }
  };

  return (
    <div className={className} onClick={click} title={`${y},${x}`}>
      <span> {square.value}</span>
    </div>
  );
};
// Creates a board of squares. The board is created by using the warpEles function which is defined below.
const warpEles = (Component, len) => {
  //console.log(len);
  let eles = [];
  for (let i = 0; i < len; i++) {
    eles.push(Component(i));
  }
  //console.log(eles);
  return eles;
};
// It renders the board of squares by using the warpEles function.
const Squares = props => {
  return warpEles(
    x => <Square {...props} key={`${props.y},${x}`} x={x} />,
    props.width
  );
};

const BoardRows = props => {
  return warpEles(i => {
    return (
      <div className="board-row" key={i}>
        <Squares {...props} y={i} />
      </div>
    );
  }, props.height);
};


// renders main board game
const Board = props => {
  return (
    <div className="board">
      <BoardRows {...props}></BoardRows>
    </div>
  );
};

export default Board;
