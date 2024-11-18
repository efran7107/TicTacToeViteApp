import "./App.css";
import { ThemeProvider } from "./components/providers/themeProvider";
import { UserProvider } from "./components/providers/userProvider";
import { ThemeButton } from "./components/themeBtn";
import { TicTacToe } from "./components/tictactoe";

function App() {
  return (
    <div className="container">
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="header-container">
          <h1>Tic Tac Toe</h1>
        </div>
        <ThemeButton />
        <UserProvider>
          <TicTacToe />
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
