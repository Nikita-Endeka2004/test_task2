import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3002/tasks";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const addTask = () => {
    axios.post(API_URL, { title, isCompleted: false }).then(() => {
      setTitle("");
      onTaskAdded();
    });
  };

  return (
    <div className="p-5">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={addTask} className="bg-blue-500 text-white p-2">
        Добавить
      </button>
    </div>
  );
};

export default TaskForm;
