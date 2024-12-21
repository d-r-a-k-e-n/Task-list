import React from "react";
import Button from "../button/Button";

export default function List({
  id,
  name,
  completed,
  toggleTaskCompleted,
  deleteTask,
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTaskCompleted(id)}
      />
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {name}
      </span>
      <Button
        type={"button"}
        onClick={() => deleteTask(id)}
        text={"Delete"}
      ></Button>
    </li>
  );
}
