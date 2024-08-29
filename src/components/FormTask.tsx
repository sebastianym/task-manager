import { useEffect, useRef } from "react";
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
  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="flex flex-col items-center bg-colorBg2 rounded-2xl mb-8 py-8 px-4 shadow-shadow3 border-[1px] border-colorIcons3"
    >
      <h1 className="text-2xl md:text-4xl font-extrabold text-colorPrimaryGreen">
        Today's Task
      </h1>
      <div className="my-8 mx-0 relative text-lg md:text-xl w-1/2 flex items-center justify-center text-white">
        <input
          className="text-lg fontImported md:text-xl bg-transparent border-[1px] border-colorIcons3 rounded-[7px] py-3 px-4 w-full text-colorGrey2 placeholder-colorGrey3 active:border-[1px] active:border-colorIcons focus:outline-none focus:border-[1px] focus:border-colorIcons"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Add a task"
        />
        <div>
          <button className="text-lg fontImported md:text-xl absolute top-0 right-0 cursor-pointer border-0 bg-colorPrimaryGreen h-full py-0 px-4 rounded-tr-[7px] rounded-br-[7px] text-colorWhite hover:bg-colorPrimary2">
            + Add Task
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormTask;
