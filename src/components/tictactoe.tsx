import { useUser } from "../functions/providerContext";
import { GameBoard } from "./gameBoard";
import { NameEntry } from "./nameEntry";

export const TicTacToe = () => {
  const { didEnterName } = useUser();
  return (
    <>
      {!didEnterName && <NameEntry />}
      {didEnterName && <GameBoard />}
    </>
  );
};
