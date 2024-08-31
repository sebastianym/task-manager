import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function FormTask({
  handleSubmit,
  value,
  handleChange,
}: {
  handleSubmit: any;
  value: string;
  handleChange: any;
}) {
  //States
  const [validate, setValidate] = useState(false);
  //refs
  const formRef = useRef<HTMLFormElement>(null);
  //form animation
  useEffect(() => {
    //form container animation
    const tl = gsap.timeline({ defaults: { ease: "power1.out", duration: 1 } });
    tl.fromTo(
      formRef.current,
      { opacity: 0, y: -800, scaleX: 0 },
      { opacity: 1, y: 0, duration: 0.5, scaleX: 1 },
      "-=0.1"
    );
  }, []);


  useEffect(() => {
    if (!value && value.length < 3) setValidate(true);
  }, [value]);
  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="flex flex-col rounded-2xl shadow-lg border-[1px] items-center bg-bgSecondary mb-8 py-8 px-4 border-colorIcons3"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold text-black my-4">
        Today's Tasks
      </h1>
      {validate && (
        <div className="flex items-center justify-center">
          <p className="text-xs md:text-lg font-semibold text-black mb-2">
            🚨 The task must be at least three characters long
          </p>
        </div>
      )}
      <div className="mb-8 mx-0 relative text-lg md:text-xl md:w-1/2 w-full flex items-center justify-center">
        <input
          className="text-lg md:text-xl bg-black/10 border-[1px] border-black/10 rounded-[7px] py-3 px-4 w-full text-black/80 placeholder-black/40 active:border-[1px] active:border-black/40 focus:outline-none focus:border-[1px]"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Add a task"
        />
        <div>
          <button className="text-lg md:text-xl absolute top-0 right-0 cursor-pointer border-0 bg-buttonPrimary h-full py-0 px-4 rounded-tr-[7px] rounded-br-[7px] text-white hover:bg-buttonPrimary/80">
            + Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormTask;
