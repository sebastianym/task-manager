const checkIcon = <i className="fa-solid fa-circle-check iconsImported"></i>;
const deleteIcon = <i className="fa-solid fa-trash-can"></i>;
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-colorBg2 relative"
    >
      <li
        ref={taskRef}
        className="py-4 px-8 rounded-[5px] mb-4 md:mb-0 list-none border-[1px] border-colorIcons3 shadow-shadow3 hover:cursor-pointer scale-active"
      >
        <p
          ref={nameRef}
          className={`text-lg md:text-xl   ${
            completed
              ? "line-through text-colorPrimaryGreen"
              : "no-underline text-colorGrey0"
          }`}
        >
          {name}
        </p>
        <div className="absolute right-0 top-1/2 gap-2 fontImported buttons text-xl md:text-4xl py-2 px-4 flex items-center justify-center bg-transparent border-0 text-colorIcons2">
          <button onDoubleClick={() => handlerCompleted(id)}>
            {checkIcon}
          </button>
          <button onDoubleClick={animateAndRemoveFromDom}>{deleteIcon}</button>
        </div>
      </li>
    </div>
  );
}

export default List;
