import React from "react";
import { useState } from "react";

export default function SearchInput({
  filterCallback
}) {
  
  const [filterText, setFilterText] = useState("");

  const searchInputChanged = (input) => {
    setFilterText(input);
    if (filterCallback) filterCallback(input);
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log('enter press here! ')
    }
  }
  
  return (
    <div className="searchbar">
      <input className="search_input" placeholder="Filter APIs..." onChange={e => searchInputChanged(e.target.value)} value={filterText}></input>
      <a className="search_icon"><i class="fas fa-search"></i></a>
    </div>
  );
}
