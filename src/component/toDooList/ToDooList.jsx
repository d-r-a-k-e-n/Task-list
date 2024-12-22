import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import List from "../list/List";
import Button from "../button/Button";

export default function ToDooList() {
  const {
    input,
    filter,
    inputSearch,
    filteredTasks,
    setInput,
    setFilter,
    setInputSearch,
    handleAddTask,
    toggleTaskCompleted,
    deleteTask,
  } = useTasks();

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

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setInputSearch(e.target.value)}
        value={inputSearch}
      />

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
