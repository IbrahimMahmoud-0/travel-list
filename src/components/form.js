import "./App.js";
import { useState } from "react";
export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? </h3>
      {/* <select className="quantity">
        {Array.from({ length: 20 }, (_, i) => {
          return (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          );
        })}
        ;
      </select> */}
      {/* cleaner */}{" "}
      <select
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
        className="quantity"
      >
        {Array.from({ length: 20 }, (_, i) => {
          return i + 1;
        }).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
        ;
      </select>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text"
        type="text"
        placeholder="Item..."
      />
      <button className="form-btn" type="submit">
        add
      </button>
    </form>
  );
}
