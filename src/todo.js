import React, { useState } from 'react'
import "./style.css"

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState([]);

  //creating the additem function
  const addItem = () => {
    if(!inputdata){
      alert("The input field is empty...! Plz fill the data")
    }else{
      const myNewInputData ={
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData])  //storing all data of user into an array after clicking on Plus(+) symbol
      setInputData("");   //empty the input field of clicking on Plus(+) symbol
    }
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItem = items.filter((curelem) => {
      return curelem.id!==index; //returining those element those are not equal to the index(id) which we are getting as parameter when user click on delit icon.
    });
    setItems(updatedItem); //updatedItem will return an array of data excluding the object of deleted id
  };

  return (
    <>
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
                      />
                    <i className="fa fa-plus add-btn" onClick={addItem}></i>
                </div>
                      {/* show all items */}
                      <div className="showItems">
                        {items.map((currElem) => {
                          return (
                            <div className="eachItem" key={currElem.id}>
                               <h3>{currElem.name}</h3>
                               <div className="todo-btn">
                               <i className="far fa-edit add-btn"></i>
                               <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElem.id)}></i>
                          </div>
                        </div>
                          );
                        })}
                      </div>
                 {/* remove all buttons */}
                <div className="showItems">
                  <button className="btn effect04"  data-sm-link-text="Remove All">
                    <span>CHECK LIST</span>
                    </button>
                    </div>
            </div>
      </div>
    </>
  )
}

export default Todo
