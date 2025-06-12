import { useState } from "react";
import PropTypes from "prop-types";
import "./ControlBar.css";

const ControlBar = ({ onSearchSubmit, onSortChange }) => {
  const [searchString, setSearchString] = useState("");
  const [sortSelection, setSortSelection] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchString);
  };

  const handleSortSelection = (e) => {
    setSortSelection(e.target.value);
    onSortChange(e.target.value);
  };

  return (
    <div className="control-bar">
      <div className="search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search"
          ></input>
          <button type="submit">Search</button>
        </form>
        <button
          onClick={() => {
            setSearchString("");
            onSearchSubmit("");
          }}
        >
          Clear
        </button>
      </div>
      <div className="sort">
        <select value={sortSelection} onChange={handleSortSelection}>
          <option value=''>Select Sort Metric</option>
          <option value="title">Title (Alphabetic)</option>
          <option value="release_date">
            Release Date (Recent → Oldest)
          </option>
          <option value="vote_average">Vote Average</option>
        </select>
      </div>
    </div>
  );
};

ControlBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default ControlBar;
