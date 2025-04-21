

// import React from 'react'
// import { JSX } from "react"
import { closestCorners, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import './App.css'
import InputField from './components/InputField'
import ToDoList from './components/ToDoList'
import { useContext } from 'react';
import { contextStore } from './store/context';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

//?app is a react fucntion compoanent but we din;t give a return type
// const App : React.FC=() =>{
//   return (
//     <>
//     <h1>Hello</h1>
//     </>
//   )
// }

//?app is a react fucntion compoanent and proevided a return type
// const App : React.FC=() : JSX.Element | JSX.Fragment=>{
//   return (
//     <>
//     <h1>Hello</h1>
//     </>
//   )
// }

//?without fat arrow .Provided a return type
// function App() : JSX.Element | JSX.Fragment{
//   return (
//     <>
//     <h1>Hello</h1>
//     </>
//   )
// }

//!All the above and these way is correct

//?without fat arrow and didn't provideda a return type
function App() {
   
  

   const context = useContext(contextStore);

   const sensors=useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor,{
      coordinateGetter:sortableKeyboardCoordinates
    })
  )
  
    if (!context) return <h1>Error....</h1>;
  
    const { todos ,stateUpdateOnDrag} = context;

    

    function getPos(id:number | string | undefined):number {
      return todos.findIndex((item)=>item?.id==id)
    }

  function handleDrag (event:DragEndEvent){
    const {active,over}=event

    if(active?.id===over?.id) return

    const originalPos:number=getPos(active.id);
    const newPos:number=getPos(over?.id);

    if (originalPos !== -1 && newPos !== -1) {
      stateUpdateOnDrag(arrayMove(todos, originalPos, newPos));
    }

  }

  return (
    <div className='app'>
      <span className='heading'>Taskify</span>
      <InputField/>
      
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDrag} sensors={sensors}>
      <ToDoList/>
      </DndContext>
    </div>
    
  )
}
export default App
