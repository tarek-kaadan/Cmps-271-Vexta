import React, { useState } from "react";

interface Props {
  search: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ search, onChange }) => (
  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <input
      type="text"
      placeholder="Search games..."
      value={search}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      style={{
        padding: "10px",
        width: "900px",
        fontSize: "16px",
        borderRadius: "30px",
        border: "1px solid rgba(84, 84, 84, 0.3)",
      }}
    />
  </div>
);

export default SearchBar;
