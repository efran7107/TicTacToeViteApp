import { gameTile } from "./types";

export type TUserProvider = {
  didEnterName: boolean;
  setDidEnterName: (didEnterName: boolean) => void;
  name: string;
  setName: (name: string) => void;
  gameboard: Array<gameTile>;
  setGameboard: (gameboard: Array<gameTile>) => void;
  changeTile: (id: number) => void;
  x: string;
  o: string;
  isGameOver: boolean,
  xWins: number,
  oWins: number,
  restart: () => void 
};
