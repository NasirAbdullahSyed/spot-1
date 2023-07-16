import React from "react";

const Controller = (props) => {
  // handles the change in input field
  const change = (e) => {
    let value = e.target.value;
    if (isNaN(value)) return;
    if (value > 20) value = 20;

    props.change(e.target.name, value);
  };

  return (
    <div className="controller">
      {/* div for width  and height*/}
      <div>
        <span className="label">Board Size：</span>
        <input type="text" name="width" value={props.width} onChange={change} />
        <span>*</span>
        <input
          type="text"
          name="height"
          value={props.height}
          onChange={change}
        />
      </div>
      {/* Div to win a game */}
      <div>
        {/* 连棋数量：= Number of connected chess */}
        <span className="label">Number of Links：</span>
        <input type="text" name="count" value={props.count} onChange={change} />
      </div>
      <div>
        {/* 下一步棋：= The next move */}
        {/* If someone has won then none value will be assigned else a value will be assigned */}
        <span className="label">Next Move：</span>
        <span>{props.winPlayer ? "无" : props.nextPlayer}</span>
      </div>
      {/*  */}
      <div>
        {/* 胜利玩家： Winning player . If there is no winner then winner (x or o) else none */}
        <span className="label">Winner：</span>
        <span>{props.winPlayer || "None"}</span>
      </div>
      <div>
        <h2>Player Keys</h2>
        <br></br>

        {/* <span>{props.players[0]}</span> */}
        <span>
          {props.players.map((player, index) => {
            const playerNumber = index + 1;
            const playerSymbol = props.players[index];
            return (
              <>
                <span key={playerNumber}>
                  Player {playerNumber}: {playerSymbol}
                </span>
                <br></br>
              </>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default Controller;
