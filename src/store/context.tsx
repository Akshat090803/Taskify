import React, { createContext, useEffect, useState } from "react";

export interface Todo{
  id:number,
  todo:string,
  isDone:boolean,
  
}

interface Store {
  inputData: string;
  setInputData: React.Dispatch<React.SetStateAction<string>>;
  todos:Todo[],
  AddTask(task:Todo):void ,
  removeTask(taskId:number):void,
  markDoneTask(taskId:number):void,
  handleEdit(taskId:number,text:string):void,
  stateUpdateOnDrag(newTodo:Todo[]):void
  
  
}

export const contextStore = createContext<Store | null>(null);

export default function ContextProvider({ children }: { children: React.ReactNode }) {

  const [inputData, setInputData] = useState<string>("");
  const [todos,setToDos]=useState<Todo[]>([]);

  //!Localstorage
  useEffect(() => {
    // Load todos from localStorage on mount
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setToDos(JSON.parse(storedTodos));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    // Save todos to localStorage whenever todos change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // This runs whenever the 'todos' state changes


  function AddTask (task:Todo):void{
          setToDos((prev)=>[...prev,task])
         
  }

  function removeTask(taskId:number):void{
    const filteredTodo:Todo[]=todos.filter((item)=>item.id!=taskId)
    setToDos(filteredTodo)
  }

 

  function markDoneTask(taskId:number):void{
    const updatedTasks=todos.map((item)=>{
      if (item.id === taskId) {
        return { ...item, isDone: !item.isDone }; // Create a new object!
      }
      return item;
    })
   setToDos(updatedTasks)
  }
  
  function handleEdit(taskId:number,text:string):void{
    const updatedTasks=todos.map((item)=>{
      if (item.id === taskId) {
        return { ...item, todo:text }; // Create a new object!
      }
      return item;
    })
   setToDos(updatedTasks)
  }

  function stateUpdateOnDrag(newTodo:Todo[]){
              setToDos(newTodo)
  }
  return (
    <contextStore.Provider value={{ inputData, setInputData,todos ,AddTask,removeTask,markDoneTask,handleEdit,stateUpdateOnDrag}}>
      {children}
    </contextStore.Provider>
  );
}
