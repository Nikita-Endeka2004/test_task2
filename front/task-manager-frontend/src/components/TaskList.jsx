import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3002/tasks";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res.data));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Список задач</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 mb-2">
            {task.title} - {task.isCompleted ? "✅ Выполнено" : "❌ Не выполнено"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
