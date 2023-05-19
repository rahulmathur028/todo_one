import React, { useState, useEffect } from "react";
import "./App.css";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //add item func
  const addItem = () => {
    if (!inputData) {
      alert("please fill some value");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewId = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewId]);
      setInputData("");
    }
  };

  //edit items

  const editItem = (index) => {
    const editedItem = items.find((curElem) => {
      return curElem.id === index;
    });

    setInputData(editedItem.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  //delete items
  const deleteItem = (index) => {
    const upDatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(upDatedItem);
  };

  const removeAll = () => {
    setItems([]);
  };

  //add local storage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container">
      <div className="main_div">
        <figure>
          <img
            src="https://img.icons8.com/?size=1x&id=XTwDewtklGCW&format=png"
            alt="todo_list"
          />
          <figcaption>ADD YOUR LIST HERE.</figcaption>
        </figure>
        <div class="input-group mb-3 w-50">
          <input
            type="text"
            className="form-control"
            placeholder="✍️ Add Items"
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
          />
         
            {toggleButton ? (
               <button
               class="btn btn-outline-primary"
               type="button"
               id="button-addon2"
               onClick={addItem}
             >
               <i class="ri-edit-line" ></i>
               </button>
              
            ) : (
           
              <button
              class="btn btn-outline-primary"
              type="button"
              id="button-addon2"
              onClick={addItem}
            >
                 <i class="ri-add-line"></i>
              </button>
            )}
          
        </div>
        <div className="showItem">
          {items.map((curElem) => {
            return (
              <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className="todo-btn">
                  <i
                    class="ri-edit-line"
                    onClick={() => editItem(curElem.id)}
                  ></i>
                  <i
                    class="ri-delete-bin-6-line"
                    onClick={() => deleteItem(curElem.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button type="button" class="btn btn-light">
            <span>
              <button type="button" class="btn btn-light" onClick={removeAll}>
                REMOVE ALL
              </button>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
