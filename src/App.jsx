import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("lists");
    setLists(
      stored
        ? JSON.parse(stored)
        : [
            {
              name: "List 1",
              items: [],
            },
          ]
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const addNewList = () => {
    const newList = {
      name: `List ${lists.length + 1}`,
      items: [],
    };
    setLists([...lists, newList]);
  };

  const addItem = (index, item) => {
    const updated = [...lists];
    updated[index].items.push(item);
    setLists(updated);
  };

  return (
    <div className="min-h-screen p-6 text-gray-800 bg-white">
      <h1 className="mb-6 text-4xl font-bold text-center">List Creation</h1>

      <div className="mb-6 text-center">
        <button
          className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
          onClick={addNewList}
        >
          Create a new list
        </button>
      </div>

      <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-2">
        {lists.map((list, idx) => (
          <div key={idx} className="p-5 shadow bg-blue-50 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-lg font-semibold">{list.name}</span>
            </div>

            <AddItemForm onAdd={(item) => addItem(idx, item)} />

            {list.items.map((item, i) => (
              <div key={i} className="p-4 mb-3 bg-white rounded-lg shadow">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.species}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !species) return;
    onAdd({ name, species });
    setName("");
    setSpecies("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h1 className="mb-6 text-4xl font-bold text-center text-blue-700">
        List Creation
      </h1>
      <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
        Add List
      </button>

      <input
        type="text"
        placeholder="Name"
        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Species"
        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
      />
      <button
        type="submit"
        className="w-full py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
      >
        Add Item
      </button>
    </form>
  );
}

export default App;
