import { useEffect, useState, useRef } from "react";
import { Task } from "./interfaces/task";
import List from "./components/List";
import FormTask from "./components/FormTask";
import uuid from "react-uuid";
import { gsap } from "gsap";

function App() {
  //states
  const [tasks, setTasks] = useState<Task[]>([]);
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

  //tasks pending
  const tasksPending = () => {
    const pending = tasks.filter((task: Task) => !task.completed);
    return pending.length;
  };

  //delete completed tasks
  const deleteCompleted = () => {
    const tasksPending = tasks.filter((task: Task) => !task.completed);
    setTasks(tasksPending);
    saveToLocalStorage(tasksPending);
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
    <main className="min-h-screen md:py-10 md:px-36 px-10 py-5 bg-bgPrimary overflow-hidden">
      <FormTask
        handleSubmit={handleSubmit}
        value={value}
        handleChange={handleChange}
      />
      <ul
        ref={taskCon}
        className="overflow-hidden bg-bgSecondary md:p-20 py-10 px-5 rounded-2xl shadow-lg border-[1px]"
      >
        <div
          ref={taskRef}
          className="grid grid-cols-1 gap-4 transition-all-300"
        >
          {tasks.length > 0 && (
            <div className="flex md:justify-between mb-3 md:flex-row flex-col">
              <p className="text-lg font-extrabold mb-2 md:mb-0">
                You have {tasksPending().toString()} tasks pending. 🚀
              </p>
              <button
                onClick={deleteCompleted}
                className="py-2 md:px-2 px-1 text-sm text-white font-bold bg-red-600 rounded-md"
              >
                Delete completed tasks
              </button>
            </div>
          )}
          {tasks.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-xs md:text-lg font-extrabold">
                There are no tasks yet. Start by adding some. 🤔
              </p>
            </div>
          ) : (
            tasks.map((task: Task) => (
              <List
                key={task.id}
                name={task.name}
                completed={task.completed}
                id={task.id}
                removeTask={removeTask}
                handlerCompleted={handlerCompleted}
              />
            ))
          )}
        </div>
      </ul>
    </main>
  );
}

export default App;
