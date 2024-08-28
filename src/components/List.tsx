const checkIcon = <i className="fa-solid fa-circle-check"></i>;
const deleteIcon = <i className="fa-solid fa-trash-can"></i>;
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function List({
  name,
  completed,
  id,
  removeTask,
}: {
  name: string;
  completed: boolean;
  id: string;
  removeTask: any;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div>
      <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <p>{name}</p>
        <div>
          <button>{checkIcon}</button>
          <button onClick={() => removeTask(id)}>{deleteIcon}</button>
        </div>
      </li>
    </div>
  );
}

export default List;
