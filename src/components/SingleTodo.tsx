import React, { JSX, useContext, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete} from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { TbStatusChange } from "react-icons/tb";
import { contextStore, Todo } from "../store/context";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"
interface Props {
  singleTodo: Todo;
}
export default function SingleTodo({ singleTodo }: Props): JSX.Element {
  const context = useContext(contextStore);
  const [edit, setEdit] = useState<string>("");

  const [editMode, setEditMode] = useState<boolean>(false);
  
  const inputRef=useRef<HTMLInputElement>(null);

  const {attributes,listeners,setNodeRef,transform,transition}=useSortable({id:singleTodo.id})
  
  if (!context) return <h1>Error...</h1>;

  const { removeTask, markDoneTask,handleEdit } = context;
   
 
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(e.target.value);
    
  };

  const style={
    transition,
    transform:CSS.Transform.toString(transform),
  }
  

  function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    if(edit.trim()){
          handleEdit(singleTodo?.id,edit.trim())
          setEditMode(false)
          setEdit("");
    }
    else alert("Please enter text")
  }

  return (
    <div className="single-container" ref={setNodeRef}  style={style}>
     <div className="draggable" {...attributes} {...listeners} >
     <span className={`${singleTodo.isDone && "completed"}`} >
        {singleTodo?.todo}{" "}
        <form action="" style={{ opacity: editMode ? "1" : "0", transition:"all linear 0.2s"}} className="editfield" onSubmit={handleSubmit}>
        <input
          type="text"
          className="editfield__box"
          value={edit}
          onChange={handleChange}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e); // ✅ Manually trigger submit when Enter is pressed
            }
          }}
      
        />
        
       
      </form>
      </span>
     </div>

     

     
      <div className="icons">
     
        {singleTodo?.isDone===false && (editMode ? <TbStatusChange size={25} onClick={handleSubmit} />
          : <AiFillEdit size={25} onClick={(event) => {
            setEditMode(!editMode)
            inputRef.current?.focus()
            setEdit(singleTodo?.todo)
            event.stopPropagation(); 
          }} />
        )}
        
        <MdDelete size={25} onClick={() => {
          removeTask(singleTodo?.id)
          console.log("btn clicked")
        }} />
       {
        editMode ||  <TiTick
        className={`${singleTodo.isDone && "completed-icon"}`}
        size={25}
        onClick={() => markDoneTask(singleTodo?.id)}
      />
      
       }
      </div>
    </div>
  );
}
