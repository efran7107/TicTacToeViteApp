import { useUser } from "../functions/providerContext";
import "../styles/gameboard.css";
export const WinnerModal = () => {
  const { isGameOver, didUserWin, name, xWins, oWins, restart, exit } =
    useUser();
  return (
    <div className={`winner-modal ${isGameOver && "active"}`}>
      <h3>{isGameOver && didUserWin ? name : "CPU"} Wins!</h3>
      <div className="wins-container">
        <div className="wins">
          <h5>{name}</h5>
          <p>{xWins}</p>
        </div>
        <div className="wins">
          <h5>CPU</h5>
          <p>{oWins}</p>
        </div>
      </div>
      <div className="btn-cont">
        <input type="button" value="Play again" onClick={() => restart()} />
        <input type="button" value="Exit" onClick={() => exit()} />
      </div>
    </div>
  );
};
