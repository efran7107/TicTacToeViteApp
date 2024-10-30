import { useUser } from "../functions/providerContext";
import "../styles/nameEntry.css";

export const NameEntry = () => {
  const { name, setName, setDidEnterName } = useUser();
  return (
    <div className="name-entry-cont">
      <label htmlFor="name">Please enter a name to begin the game</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Your name here..."
      />
      <button
        onClick={() => {
          if (name.trim().length < 2) {
            return;
          }
          setDidEnterName(true);
        }}
      >
        Enter
      </button>
    </div>
  );
};
