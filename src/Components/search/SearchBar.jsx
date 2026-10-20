import "./searchBar.css";
import { useState } from "react";
import Button from "../ui/Button";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value.trim());
  }

  function handleReset() {
    setValue("");
    onSearch("");
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Rechercher un film..."
        aria-label="Rechercher un film"
      />

      <Button $color="#363b49" type="button" onClick={handleReset}>
        Réinitialiser
      </Button>
      <Button type="submit">Rechercher</Button>
    </form>
  );
}

export default SearchBar;
