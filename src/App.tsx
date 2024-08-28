import { useState } from "react";
import { Task } from "./interfaces/task";
import List from "./components/List";
import FormTask from "./components/FormTask";
import uuid from "react-uuid";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const infoInitial = [
  {
    id: uuid(),
    name: "Learn React",
    completed: false,
  },
  {
    id: uuid(),
    name: "Learn Firebase",
    completed: false,
  },
  {
    id: uuid(),
    name: "Learn Node",
    completed: false,
  },
];

function App() {
  //states
  const [tasks, setTasks] = useState<Task[]>(infoInitial);
  const [value, setValue] = useState("");

  //detect change in input
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  //submit form and validate
  const handleSubmit = (e: any) => {
    //form is not submitted automatically
    e.preventDefault();

    //We validate that it is not empty and that it is greater than 3 characters
    if (!value || value.length < 3) return;

    //we create the new task and pass it to the array
    const newTask = {
      id: uuid(),
      name: value,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setValue("");
  };

  //remove task
  const removeTask = (id: any) => {
    //we create a new array without the deleted task and overwrite the original array
    const tasksFiltered = tasks.filter((task: Task) => task.id !== id);
    setTasks(tasksFiltered);
  };

  const handleDragEnd = (event: any) => {
    //active is the position of the current Li and over is where we want to put the Li
    const { active, over } = event;

    //We validate that you do not want to put it in the same place
    if (active.id !== over.id) {
      //We look for the current and expected index in the Li arrangement
      const overIndex = tasks.findIndex((task: Task) => task.id === over.id);
      const activeIndex = tasks.findIndex(
        (task: Task) => task.id === active.id
      );

      //We create a new arrangement with the tasks, delete the li in the current position and replace it in the desired position
      const newTasks = [...tasks];
      newTasks.splice(activeIndex, 1);
      newTasks.splice(overIndex, 0, tasks[activeIndex]);
      setTasks(newTasks);
    }
  };

  return (
    <main>
      <FormTask
        handleSubmit={handleSubmit}
        value={value}
        handleChange={handleChange}
      />
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((task: Task) => task.id)}>
          <ul>
            {tasks.map((task: Task) => {
              return (
                <List
                  key={task.id}
                  name={task.name}
                  completed={task.completed}
                  id={task.id}
                  removeTask={removeTask}
                />
              );
            })}
          </ul>
        </SortableContext>
      </DndContext>
    </main>
  );
}

export default App;
