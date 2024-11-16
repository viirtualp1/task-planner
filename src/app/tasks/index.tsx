import { useEffect, useState } from "react";
import api from "@/services/axios";
import { TaskData } from "@/types/tasks";

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error(error);
        console.error("Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
