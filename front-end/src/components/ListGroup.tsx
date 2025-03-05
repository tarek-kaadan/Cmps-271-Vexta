import { MouseEvent } from "react";

export default function ListGroup() {
  let items = ["Abu Ale", "Abu Hadi Logistics", "Landan", "Paris"];

  //Event handler
  const handleCLick = (event: MouseEvent) => console.log(event);
  return (
    <>
      <h1>Fadi</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item} onClick={handleCLick}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
