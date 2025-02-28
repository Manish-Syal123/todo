import React, { useState, useEffect } from "react";
import "./style.css";

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [isEditItem, setEditItem] = useState(null);
  const [toggleButton, setToggleButton] = useState(false);

  // Fetch Data Function
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/getAllItems");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async () => {
    if (!inputdata) {
      alert("The input field is empty...! Plz fill the data");
      return;
    }

    if (toggleButton) {
      await fetch("http://localhost:8080/api/updateItem", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: isEditItem, name: inputdata }),
      });
      setToggleButton(false);
    } else {
      await fetch("http://localhost:8080/api/addItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: new Date().getTime().toString(),
          name: inputdata,
        }),
      });
    }

    setInputData("");
    setEditItem(null);
    fetchData(); // Fetch updated list
  };

  const editItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setInputData(itemToEdit.name);
    setEditItem(id);
    setToggleButton(true);
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:8080/api/deleteItem/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchData(); // Fetch updated list
  };

  const removeAll = async () => {
    await fetch("http://localhost:8080/api/items/deleteAllItems", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchData(); // Fetch updated list
  };

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src="./images/todo.svg" alt="todologo" />
          <figcaption>Add Your List Here ✌️</figcaption>
        </figure>
        <div className="addItems">
          <input
            type="text"
            placeholder="✍️ Add Item"
            className="form-control"
            value={inputdata}
            onChange={(event) => setInputData(event.target.value)}
            onKeyDown={(event) => (event.key === "Enter" ? addItem() : null)}
          />
          {toggleButton ? (
            <i className="far fa-edit add-btn" onClick={addItem}></i>
          ) : (
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          )}
        </div>
        {/* show all items */}
        <div className="showItems">
          {items.map((currElem) => (
            <div className="eachItem" key={currElem.id}>
              <h3>{currElem.name}</h3>
              <div className="todo-btn">
                <i
                  className="far fa-edit add-btn"
                  onClick={() => editItem(currElem.id)}
                ></i>
                <i
                  className="far fa-trash-alt add-btn"
                  onClick={() => deleteItem(currElem.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
        {/* remove all buttons */}
        <div className="showItems">
          <button
            className="btn effect04"
            data-sm-link-text="Remove All"
            onClick={removeAll}
          >
            <span>CHECK LIST</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
