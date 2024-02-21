import "./App.js";
export default function Stats({ items }) {
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
