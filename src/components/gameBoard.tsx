import { functions } from "../functions/functions";
import { useUser } from "../functions/providerContext";
import "../styles/gameboard.css";

export const GameBoard = () => {
  const { name, gameboard, changeTile, x ,o } = useUser();
  return (
    <div className="gameboard-container">
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
            className={functions.buttonClass(tile.owner, x, o)}
              type="button"
              value={tile.owner}
              key={tile.id}
              onClick={() => changeTile(tile.id)}
              disabled={tile.owner !== ''}
            />
          );
        })}
      </div>
    </div>
  );
};
