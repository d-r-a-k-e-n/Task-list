import ToDooList from "./component/toDooList/ToDooList";
import { TaskProvider } from "./context/TaskContext";

export default function App() {
  return (
    <TaskProvider>
      <ToDooList />
    </TaskProvider>
  );
}
