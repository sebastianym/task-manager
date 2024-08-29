import { useEffect, useState, useRef } from "react";
import { Task } from "./interfaces/task";
import List from "./components/List";
import FormTask from "./components/FormTask";
import uuid from "react-uuid";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { gsap } from "gsap";

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

  //refs
  const taskRef = useRef<HTMLDivElement>(null);
  const taskCon = useRef<HTMLUListElement>(null);

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
    //send to local storage
    saveToLocalStorage([...tasks, newTask]);
    setValue("");
  };

  //remove task
  const removeTask = (id: string) => {
    deleteFromLocalStorage(id);

    //we create a new array without the deleted task and overwrite the original array
    const tasksFiltered = tasks.filter((task: Task) => task.id !== id);
    setTasks(tasksFiltered);
  };

  //task completed
  const handlerCompleted = (id: string) => {
    //We look for the task to change its status
    const taskCompleted = tasks.map((task: Task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(taskCompleted);
    saveToLocalStorage(taskCompleted);
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

  //local storage
  const saveToLocalStorage = (tasks: Task[]) => {
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  //delete from local storage
  const deleteFromLocalStorage = (id: string) => {
    const filteredTasks = tasks.filter((task: Task) => {
      return task.id !== id;
    });
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  };

  //retrieve tasks from local storage
  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  //animate
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.out", duration: 1 } });
    tl.fromTo(
      taskRef.current,
      { opacity: 0, x: 800 },
      { opacity: 1, x: 0, duration: 0.5 }
    )

      //todos Container animation
      .fromTo(
        taskCon.current,
        { opacity: 0, y: 800, scale: 0.5 },
        { opacity: 1, y: 0, duration: 0.5, scale: 1 },
        "-=0.5"
      );
  }, []);

  return (
    <main className="min-h-screen py-20 px-60 bg-colorBg3 overflow-hidden">
      <FormTask
        handleSubmit={handleSubmit}
        value={value}
        handleChange={handleChange}
      />
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((task: Task) => task.id)}>
          <ul
            ref={taskCon}
            className="overflow-hidden bg-colorBg2 p-20 rounded-2xl shadow-shadow3 border-[1px] border-colorIcons3"
          >
            <div className="flex justify-between items-center mb-8">
              <p className="text-xl md:text-2xl text-colorGrey2 font-semibold">
                Priority
              </p>
              <p className="text-xl md:text-2xl text-colorDanger font-semibold">
                High
              </p>
            </div>
            <div
              ref={taskRef}
              className="grid grid-cols-1 gap-4 transition-all-300 md:grid-cols-2 mb-8"
            >
              {tasks.map((task: Task) => {
                return (
                  <List
                    key={task.id}
                    name={task.name}
                    completed={task.completed}
                    id={task.id}
                    removeTask={removeTask}
                    handlerCompleted={handlerCompleted}
                  />
                );
              })}
            </div>
            <div className="mb-2 flex justify-end">
              <p className="text-xl md:text-2xl font-semibold degrade">Low</p>
            </div>
          </ul>
        </SortableContext>
      </DndContext>
    </main>
  );
}

export default App;
