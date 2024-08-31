const checkIcon = <i className="fa-solid fa-circle-check"></i>;
const deleteIcon = <i className="fa-solid fa-trash-can"></i>;
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function List({
  name,
  completed,
  id,
  removeTask,
  handlerCompleted,
}: {
  name: string;
  completed: boolean;
  id: string;
  removeTask: any;
  handlerCompleted: any;
}) {
  //refs
  const taskRef = useRef<HTMLLIElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  //animations
  const animateAndRemoveFromDom = () => {
    gsap.to(taskRef.current, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      rotationX: 180,
      onComplete: () => {
        removeTask(id);
      },
    });
  };

  //list item anim
  useEffect(() => {
    gsap.from(nameRef.current, {
      duration: 0.5,
      opacity: 0,
      y: 20,
      rotationX: 180,
      delay: -0.1,
      onComplete: () => {
        gsap.to(nameRef.current, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          rotationX: 0,
        });
      },
    });
  }, [completed]);

  return (
    <div className="bg-bgSecondary relative drop-shadow-md border-l-4 border-red-700 rounded-md">
      <li ref={taskRef} className="py-4 px-4 hover:cursor-pointer scale-active">
        <p
          ref={nameRef}
          className={`text-base md:text-2xl   ${
            completed
              ? "line-through text-black/40"
              : "no-underline text-black/90"
          }`}
        >
          {name}
        </p>
        <div className="absolute right-0 top-1/2 gap-4 buttons text-xl md:text-2xl py-2 px-4 flex items-center justify-center bg-transparent border-0 text-black/50">
          <button onClick={() => handlerCompleted(id)}>{checkIcon}</button>
          <button onClick={animateAndRemoveFromDom}>{deleteIcon}</button>
        </div>
      </li>
    </div>
  );
}

export default List;
