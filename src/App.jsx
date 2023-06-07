import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [itemText, setItemText] = useState("");
  const [itemList, setItemList] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  // funcion para Agregar Items a la lista
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
      setItemList((prev) => [...prev, res.data]);
      setItemText("");
    } catch (error) {
      console.log(error);
    }
  };

  // funcion para obtener los items dfe la lista -- usando useEffect

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get(
          "https://backend-to-do-react.vercel.app/api/items"
        );
        setItemList(res.data);
        console.log("renderizando");
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, []);

  //Editar los items
  const editItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://backend-to-do-react.vercel.app/api/item/${updateItemText}`,
        {
          item: updateItemText,
          completed: false,
        }
      );
      console.log(res.data);
      const updateItemIndex = itemList.findIndex(
        (item) => item._id === isUpdating
      );
      const updateItem = (itemList[updateItemIndex].item = updateItemText);
      setUpdateItemText("");
      setIsUpdating("");
    } catch (error) {
      console.log(error);
    }
  };
  // mostrar el formulario para actualizar el item

  const renderUpdateForm = () => (
    <form
      onSubmit={(e) => {
        editItem(e);
      }}
    >
      <input
        type="text"
        placeholder="Actualizar Item"
        onChange={(e) => setUpdateItemText(e.target.value)}
        value={updateItemText}
      />
      <button type="submit">Actualizar</button>
    </form>
  );

  //Borrar un item
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(
        `https://backend-to-do-react.vercel.app/api/item/${id}`
      );
      const newListItems = itemList.filter((item) => item._id !== id);
      setItemList(newListItems);
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
          {itemList.map((item) => (
            <div className="todo-item" key={item._id}>
              {isUpdating === item._id ? (
                renderUpdateForm()
              ) : (
                <>
                  <p className="item-content">{item.item}</p>
                  <button
                    className="update-item"
                    onClick={() => {
                      setIsUpdating(item._id);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-item"
                    onClick={() => {
                      deleteItem(item._id);
                    }}
                  >
                    Borrar
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

//break min 26
