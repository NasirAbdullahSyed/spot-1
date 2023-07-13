import React, { useState,useEffect, useMemo } from "react";
import Controller from "./controller";
import Board from "./gameContainer";
// import History from "./history";
import "./style.scss";
import { useMultiplayerState, insertCoin, myPlayer, usePlayersList,onPlayerJoin } from 'playroomkit';

function Game(props) {
  const unsortedPlayers = usePlayersList();

  const players = unsortedPlayers.sort((a, b) => {
    return a.id - b.id;
  }); 

  const playerSymbols =  players.map((player) => {
      return player.getState("symbol");
    });
  

  const [isSdkLoading, setIsSdkLoading] = useState(true);
    const [state, setState] = useMultiplayerState("something",getInitState());
    console.log(players)
    // console.log(players[0].state.profile.name)
    // console.log(players[1].state.profile.name)

  const initializeSdk = async () => {
    setIsSdkLoading(true);
    try {
      
      await insertCoin();
     
    } catch (error) {
      console.log(error);
    }
    setIsSdkLoading(false);
  };
  
  // const myPlayerState=myPlayer();
  // useEffect(() => {
  //   if(myPlayerState && !myPlayerState.getState("symbol")){
  //     myPlayerState.setState("symbol","a")  
  //     console.log("myPlayerState",myPlayerState.getState("symbol"))
  //   }

  // }, [myPlayerState]); 

  const myPlayerState = myPlayer();
const alphabetPool = "abcdefghijklmnopqrstuvwxyz";

useEffect(() => {
  if (myPlayerState && !myPlayerState.getState("symbol")) {
    const assignedSymbols = players.map(player => player.state.symbol);
    const remainingSymbols = alphabetPool.split('').filter(symbol => !assignedSymbols.includes(symbol));

    if (remainingSymbols.length > 0) {
      const randomSymbol = remainingSymbols[Math.floor(Math.random() * remainingSymbols.length)];
      myPlayerState.setState("symbol", randomSymbol);
      console.log("myPlayerState", myPlayerState.getState("symbol"));
    }
  }
}, [myPlayerState]);


  useEffect(() => {
    initializeSdk();
  }, []);

  function getInitState() {
    // const players = ["o", "x", "z", "a"] // Add additional players here

    return {
      //history: [],
      data: {},
      stepIndex: 0,
      count: 5,
      width: 15,
      height: 15,
      // players,
      currentPlayerIndex: 0,
      // nextPlayer: players[0],
      winPlayer: ""
    };
  }

  function initGame() {
    setState(getInitState());
  }

  function calculateWinnerByCoord(squares, square) {
    const { x, y } = square;
    const size = state.count - 1;

    const calculate = (total, getSquare) => {
      let count = [];
      for (let index = 0; index < total; index++) {
        let { now, next } = getSquare(index);
        if (now && next && now.value === next.value) {
          count.push(now);
          if (count.length === size) {
            count.push(next);
            return count;
          }
        } else {
          count = [];
        }
      }
      return "";
    };

    const calculateY = () => {
      let start = y - size < 0 ? 0 : y - size;
      return calculate(y + size, index => {
        let now = squares[`${start + index}${x}`];
        let next = squares[`${start + index + 1}${x}`];
        return { now, next };
      });
    };

    const calculateX = () => {
      let start = x - size < 0 ? 0 : x - size;
      return calculate(x + size, index => {
        let now = squares[`${y}${start + index}`];
        let next = squares[`${y}${start + index + 1}`];
        return { now, next };
      });
    };

    const calculateL = () => {
      let startY = y - size;
      let startX = x - size;
      return calculate(size * size, index => {
        let now = squares[`${startY + index}${startX + index}`];
        let next = squares[`${startY + index + 1}${startX + index + 1}`];
        return { now, next };
      });
    };

    const calculateR = () => {
      let startY = y - size;
      let startX = x + size;
      return calculate(size * size, index => {
        let now = squares[`${startY + index}${startX - index}`];
        let next = squares[`${startY + index + 1}${startX - index - 1}`];
        return { now, next };
      });
    };


    return calculateY() || calculateX() || calculateL() || calculateR();
  }

  function boardSizeChange(name, value) {
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  function jumpTo(index, isClick) {
    let record = state.history[index];
    if (!record) return;
    if (isClick) {
      setState(record);
    } else {
      let { history, stepIndex } = state;
      setState({ ...record, history, stepIndex });
    }
  }

  function squareClick(coord, square) {
    if (state.winPlayer) return;
    let data = {...state.data};
    data[coord] = square;
    let winCoords = calculateWinnerByCoord(data, square);
    let winPlayer = "";
    if (winCoords) {
      winPlayer = winCoords[0].value;
      winCoords.forEach(v => (data[`${v.y}${v.x}`].win = true));
    }

    const { currentPlayerIndex } = state;
    const players = playerSymbols;
    let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    let nextPlayer = players[nextPlayerIndex];

    //let stepIndex = state.history.length;
    let newState = { 
      ...state,
      data,
      nextPlayer,
      currentPlayerIndex: nextPlayerIndex,
      winPlayer,
     // stepIndex
    };
   // newState.history = [...(state.history.length ? state.history : []), {...newState}];
    setState(newState);
  }

 


  return (
    <div className="game">
      {/* <h1 className="game-title">
        SPOT {state.winPlayer ? "游戏结束" : ""}
      </h1> */}
      {/* <History
        history={state.history}
        stepIndex={state.stepIndex}
        initGame={initGame}
        jumpTo={jumpTo}
      ></History> */}
      <Board {...state} squareClick={squareClick}></Board>
      {/* <Controller
        players={playerSymbols}
        width={state.width}
        height={state.height}
        count={state.count}
        winPlayer={state.winPlayer}
        nextPlayer={state.nextPlayer}
        change={boardSizeChange}
      ></Controller> */}
    </div>
  );
}

export default Game;
