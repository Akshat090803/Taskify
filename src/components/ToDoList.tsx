import { JSX, useContext } from "react";
import SingleTodo from "./SingleTodo";
import { contextStore } from "../store/context";
import Empty from "./Empty";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function ToDoList(): JSX.Element {
  const context = useContext(contextStore);

  if (!context) return <h1>Error....</h1>;

  const { todos } = context;
  

  return (
    <SortableContext items={todos} strategy={verticalListSortingStrategy}>
      <div className="container">
        {todos && todos.length > 0 ? (
          todos.map((todo) => {
            return <SingleTodo singleTodo={todo} key={todo.id} />;
          })
        ) : (
          <Empty />
        )}
      </div>
    </SortableContext>
  );
}
