import React, { useContext, useState } from "react";
import { SearchContext } from "../../App";

// interface InputData {
//     title: string;
//     time: number;
//     ingredients: string[]
// }
// FC<InputData>

const Searchbar = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const { dispatch } = useContext(SearchContext);
  function lookForSearchValue() {
    dispatch({ type: "SEARCH", value: searchValue });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="keywords"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            lookForSearchValue();
          }
        }}
      ></input>
      <button onClick={lookForSearchValue}>Change value</button>
    </div>
  );
};

export default Searchbar;
