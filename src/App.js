import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const transformtask = (dataobj) => {
    const loadedTasks = [];

    for (const taskKey in dataobj) {
      loadedTasks.push({ id: taskKey, text: dataobj[taskKey].text });
    }

    setTasks(loadedTasks);
    console.log(tasks);
  };
  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(
    {
      url: "https://http-task-f93ec-default-rtdb.firebaseio.com/tasks.json",
    },
    transformtask
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
