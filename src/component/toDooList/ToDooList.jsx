import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import List from "../list/List";
import Button from "../button/Button";

export default function ToDooList() {
  const { tasks, addTask, toggleTaskCompleted, deleteTask } = useTasks();
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [inputSearch, setInputSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleAddTask = () => {
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  };

  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setInputSearch(value);
  //   const filtered = tasks.filter((task) =>
  //     task.name.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFilteredItems(filtered);
  //   console.log(filtered);
  // };

  return (
    <div className="to-doo">
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="text"
        placeholder="New task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
      />
      <Button type={"button"} onClick={handleAddTask} text={"Add"}></Button>

      {/* <input
        type="text"
        placeholder="Search"
        onChange={onChangeSearch}
        // onKeyDown={(e) => e.key === "Enter" && onChangeSearch()}
        value={inputSearch}
      />
      <button onClick={onChangeSearch}>Search</button> */}

      <ul className="list">
        {filteredTasks.map((task) => (
          <List
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
