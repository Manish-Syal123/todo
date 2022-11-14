import React, { useState, useEffect } from 'react'
import "./style.css"

//get the local storage data back 
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if(lists) {
    return JSON.parse(lists); //convert a string into array 
  } else {
    return [];
  }
};


const Todo = () => {
  const [inputdata, setInputData] = useState("");  //whatever the data user will add into the input field <input />
  const [items, setItems] = useState(getLocalData());  //the Items having all the stored data of user n the form of array
  const [isEditItem, setEditItem] = useState("");      //taking a id of that data to be edite
  const [toggleButton, setToggleButton] = useState(false);

  //creating the additem function
  const addItem = () => {
    if(!inputdata){
      alert("The input field is empty...! Plz fill the data")
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if(curElem.id === isEditItem) {
            return {...curElem, name: inputdata};
          }
          return curElem;
        })
      );

      setInputData(""); //reset the input field to blank after updating
      setEditItem(null);
      setToggleButton(false);  //changing the update btn again to add(+) btn 
    }
    else{
      const myNewInputData ={
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData])  //storing all data of user into an array after clicking on Plus(+) symbol
      setInputData("");   //empty the input field of clicking on Plus(+) symbol
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((currElem) => {
      return currElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setEditItem(index);
    setToggleButton(true);
  }

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItem = items.filter((curelem) => {
      return curelem.id!==index; //returining those element those are not equal to the index(id) which we are getting as parameter when user click on delit icon.
    });
    setItems(updatedItem); //updatedItem will return an array of data excluding the object of deleted id
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);  
  }

  //adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items)); //as the localstorage() method takes parameter as key and value pair in String so thats why using Json.stringify() method we modified that items array into string 
  }, [items]);

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
                    {toggleButton ? (
                      <i className="far fa-edit add-btn" onClick={addItem}></i>
                    ) : (
                      <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    )}
                </div>
                      {/* show all items */}
                      <div className="showItems">
                        {items.map((currElem) => {
                          return (
                            <div className="eachItem" key={currElem.id}>
                               <h3>{currElem.name}</h3>
                               <div className="todo-btn">
                               <i className="far fa-edit add-btn"
                                    onClick={() => editItem(currElem.id)}></i> 
                               <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currElem.id)}></i>
                          </div>
                        </div>
                          );
                        })}
                      </div>
                 {/* remove all buttons */}
                <div className="showItems">
                  <button className="btn effect04"  data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>CHECK LIST</span>
                    </button>
                    </div>
            </div>
      </div>
    </>
  )
}

export default Todo
