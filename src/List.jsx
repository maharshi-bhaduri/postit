import React from "react";

function List() {
  const img1 = "https://picsum.photos/200";
  return (
    <ul contentEditable="true" spellCheck="false">
      <li>Bacon</li>
      <li>Jamon</li>
      <li>Noodles</li>
      <li>
        <div>
          <img src={img1} alt="random" />
        </div>
      </li>
    </ul>
  );
}

export default List;
