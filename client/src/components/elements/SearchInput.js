import React from "react";
import { useState, useEffect } from "react";
import Switch from "react-switch";

export default function SearchInput({
  filterCallback,
  protocols,
  categories
}) {

  const [filterText, setFilterText] = useState("");
  const [showGraphQl, setShowGraphQl] = useState(true);

  const [selectedProtocols, setSelectedProtocols] = useState(protocols);
  const [selectedCategories, setSelectedCategories] = useState(categories);

  const [filterBoxVisible, setFilterBoxVisible] = useState(false);

  useEffect(() => {
    if (filterCallback) filterCallback(filterText, selectedProtocols, selectedCategories);
  }, [filterText, selectedCategories, selectedProtocols]);

  const searchInputChanged = (input) => {
    setFilterText(input);
    //if (filterCallback) filterCallback(input, selectedProtocols, selectedCategories);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('enter press here! ')
    }
  }

  function getCategoryMargin(i) {
    if (i == 0)
      return "0px"
    else
      return "20px"
  }

  function toggleProtocol(protocol) {
    setSelectedProtocols({...selectedProtocols, [protocol]: !selectedProtocols[protocol]});
  }

  function toggleCategory(category) {
    setSelectedCategories({...selectedCategories, [category]: !selectedCategories[category]});
  }

  return (
    <div>
      <div className="searchbar">
        <input className="search_input" placeholder="Filter APIs..." onChange={e => searchInputChanged(e.target.value)} value={filterText}></input>
        <a className="search_icon" style={{ position: "relative", left: "-30px" }}><i class="fas fa-search"></i></a>
        <a className="search_icon filter_icon" style={{ position: "relative", top: "-30px" }} onClick={() => setFilterBoxVisible(!filterBoxVisible)}><i class="fas fa-bars"></i></a>
      </div>
      {filterBoxVisible &&
          <div style={{textAlign: "left", fontSize: "14px", marginLeft: "20px", marginBottom: "5px", userSelect: "none"}}>
            <div>Protocols</div>
            { Object.keys(selectedProtocols).map((protocol, i) =>
              <label style={{marginLeft: getCategoryMargin(i)}} key={protocol}>
                <Switch
                  checked={selectedProtocols[protocol]}
                  onChange={(e) => toggleProtocol(protocol)}
                  onColor="#6163FF"
                  onHandleColor="#5658DD"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={15}
                  width={38}
                  className="react-switch"
                  id={"material-switch-"}
                  key={protocol}
                />
                <span style={{position: "relative", top: "-10px", left: "5px"}}>{protocol.toUpperCase()}</span>
              </label>
            )}

            { Object.keys(selectedCategories).length > 1 &&
              <div>Categories</div>
            }
            { Object.keys(selectedCategories).length > 1 &&
              Object.keys(selectedCategories).map((category, i) =>
                <label style={{marginLeft: getCategoryMargin(i)}} key={category}>
                  <Switch
                    checked={selectedCategories[category]}
                    onChange={(e) => toggleCategory(category)}
                    onColor="#6163FF"
                    onHandleColor="#5658DD"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={38}
                    className="react-switch"
                    id={"material-switch-"}
                  />
                  <span style={{position: "relative", top: "-10px", left: "5px"}}>{category}</span>
                </label>
            )
            }
          </div>
        }
    </div>
  );
}
