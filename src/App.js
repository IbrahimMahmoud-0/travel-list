import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDelteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items, onDelteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => +a.packed - +b.packed);
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDelteItem={onDelteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description order</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button>Reset</button>
      </div>
    </div>
  );
}

function Item({ item, onDelteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button onClick={() => onDelteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing List 🔥</em>
      </p>
    );
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((packedItems / numItems) * 100);

  // console.log(packedItems, packedPercentage);

  return (
    <footer className="stats">
      <em>
        {packedPercentage !== 100
          ? `   💼 You have ${numItems} items on your list, and you already packed
        ${packedItems} (${packedPercentage}%)`
          : "You got everything Ready to go 🛫"}
      </em>
    </footer>
  );
}
