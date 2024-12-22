import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const loadTasksFromLocalStorage = () => {
    const tasks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key) || "{}");
      tasks.push({ id: key, name: value.name, completed: value.completed });
    }
    return tasks;
  };

  const [tasks, setTasks] = useState(loadTasksFromLocalStorage);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [inputSearch, setInputSearch] = useState("");

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.name.toLowerCase().includes(inputSearch.toLowerCase())
    );

  const addTask = (name) => {
    const newTask = { id: Date.now().toString(), name, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem(newTask.id, JSON.stringify(newTask));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.removeItem(id);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    const updatedTask = updatedTasks.find((task) => task.id === id);
    localStorage.setItem(id, JSON.stringify(updatedTask));
  };

  const handleAddTask = () => {
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  };

  const value = {
    tasks,
    input,
    filter,
    inputSearch,
    filteredTasks,
    setInput,
    setFilter,
    setInputSearch,
    addTask,
    toggleTaskCompleted,
    deleteTask,
    handleAddTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  return useContext(TaskContext);
};
