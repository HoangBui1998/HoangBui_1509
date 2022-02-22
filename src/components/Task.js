import { FaTimes, FaTasks } from "react-icons/fa";
const Task = ({ tas, onDelete, onToggle }) => {
  return (
    <div>
      {tas.map((task) => (
        <div
          className={`task ${task.reminder ? "reminder" : ""}`}
          onDoubleClick={() => {
            onToggle(task.id);
          }}
        >
          <h3 key={task.id}>
            {task.text}
            <FaTimes
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => onDelete(task.id)}
            />
          </h3>
          <p>{task.day}</p>
        </div>
      ))}
      ;
    </div>
  );
};

export default Task;
