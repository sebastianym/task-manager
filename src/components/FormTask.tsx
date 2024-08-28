function FormTask({
  handleSubmit,
  value,
  handleChange,
}: {
  handleSubmit: any;
  value: string;
  handleChange: any;
}) {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Today's Task</h1>
      <div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Add a task"
        />
        <div>
          <button>+ Add Task</button>
        </div>
      </div>
    </form>
  );
}

export default FormTask;
