import React, { JSX, useContext, useRef } from "react";
import { contextStore, Todo } from "../store/context";

function InputField(): JSX.Element {
  const context = useContext(contextStore);
  const inputRef1=useRef<HTMLInputElement>(null);

  if (!context) {
    return <h1>Error</h1>;
  }

  const { inputData, setInputData, AddTask } = context;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
   
    if(inputData.trim()){
      const currTodo: Todo = { id: Date.now(), todo: inputData.trim(), isDone: false };
      AddTask(currTodo);
      inputRef1.current?.blur();
    }
    else{
      alert('Please Enter the Task')
    }
    
    setInputData("");
    
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input__box"
        placeholder="Add a Task, Multiply the Stress"
        value={inputData}
        onChange={handleChange}
        ref={inputRef1}
      />
      <button type="submit" className="input__btn">
        Go
      </button>
    </form>
  );
}

export default InputField;
