import React from 'react';

interface itemSelectorProps {
  title: string;
  selectedItem: string;
  list: string[];
  setSelectedItem: (genre: string) => void;
}

const DropDownSelector: React.FC<itemSelectorProps> = ({
  title,
  selectedItem,
  list,
  setSelectedItem,
}) => {
  return (
    <p
      style={{
        fontSize: '1.25rem',
        margin: '0.5rem ',
      }}
    >
      {title}
      <select
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.target.value)}
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginLeft: '10px',
        }}
      >
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </p>
  );
};

export default DropDownSelector;
