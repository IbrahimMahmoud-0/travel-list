import { useState } from "react";
import Logo from "./logo.js";
import Form from "./form.js";
import PackingList from "./packingList.js";
import Stats from "./stats.js";

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
  function handleResetUI() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items? "
    );
    confirmed && setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDelteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClickReset={handleResetUI}
      />
      <Stats items={items} />
    </div>
  );
}
