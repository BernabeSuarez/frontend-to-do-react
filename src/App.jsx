import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [itemText, setItemText] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend-to-do-react.vercel.app/api/item",
        {
          item: itemText,
          completed: false,
        }
      );
      console.log(res);
      setItemText("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="app">
        <h1>ToDo List</h1>
        <form onSubmit={(e) => addItem(e)}>
          <input
            type="text"
            placeholder="Agregar items a la lista"
            onChange={(e) => {
              setItemText(e.target.value);
            }}
            value={itemText}
          />
          <button type="submit">Agregar</button>
        </form>
        <div className="todo-listItem">
          <div className="todo-item">
            <p className="item-content">Aca se renderizan los items</p>
            <button className="update-item">Editar</button>
            <button className="delete-item">Borrar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

//break min 26
