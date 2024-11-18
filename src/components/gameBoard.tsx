import { functions } from "../functions/functions";
import { useUser } from "../functions/providerContext";
import "../styles/gameboard.css";
import { WinnerModal } from "./winnerModal";

export const GameBoard = () => {
  const {
    name,
    gameboard,
    changeTile,
    x,
    o,
    xWins,
    oWins,
    isGameOver,
    didEnterName,
  } = useUser();
  return (
    <div className={`gameboard-container ${didEnterName && "active"}`}>
      <div className="names-container">
        <div className="player-name">
          <h3>{name}</h3>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="cpu-name">
          <h3>CPU</h3>
          <i className="fa-solid fa-o"></i>
        </div>
      </div>
      <div className="gameboard">
        {gameboard.map((tile) => {
          return (
            <input
              className={`${functions.buttonClass(tile.owner, x, o)} ${
                tile.isWinningTile ? "winning-btn" : ""
              }`}
              type="button"
              id={tile.id.toString()}
              value={tile.owner}
              key={tile.id}
              onClick={() => changeTile(tile.id)}
              disabled={tile.owner !== "" || isGameOver}
            />
          );
        })}
      </div>
      <div className="wins-container">
        <div className="wins">
          <h5>
            <span>{x}</span> wins
          </h5>
          <p>{xWins}</p>
        </div>
        <div className="wins">
          <h5>
            <span>{o}</span> wins
          </h5>
          <p>{oWins}</p>
        </div>
      </div>
      {isGameOver && <WinnerModal />}
    </div>
  );
};
