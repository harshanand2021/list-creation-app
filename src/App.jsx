import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [input, setInput] = useState("");

  return (
    <>
      <div style={{ padding : '2rem' }} className="AppHeader">
        <h1>List Creator</h1>
      </div>
      <div className="ListItems">
        
      </div>
    </>
  );
}

export default App;
