import Header from "./components/Header";
import Footer from "./components/Footer";
import Task from "./components/Task";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTask from "./components/AddTask";
import About from "./components/About"

const App = () => {
  const [showTask, setShowtask] = useState(false);
  const [tasks, setTasks] = useState([
    /* {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 6th at 1:30pm",
      reminder: "false",
    },
    {
      id: 2,
      text: "metting friend at high school",
      day: "Nov 15 at 8:00am",
      reminder: "true",
    },
    {
      id: 3,
      text: "Kiss Van",
      day: "2022 Jan 01 at 0:00am ",
      reminder: "true",
    }, */
  ]);
  useEffect(() => {
    const getTask = async () => {
      const taskFromserver = await fetchTask();
      setTasks(taskFromserver);
    };
    getTask();
  }, []);

  //fetchTask

  const fetchTask = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  //fetchTasks
  const fetchTasks = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  //addTask
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    /* const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]); */
  };
  //delete task
  const delelteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //toggleReminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTasks(id);
    const upTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(upTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((taskss) =>
        taskss.id === id ? { ...taskss, reminder: data.reminder } : taskss
      )
    );
  };
  return (
    <div className="container">
      <Header onAdd={() => setShowtask(!showTask)} showAdd={showTask} />
      {showTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Task
          tas={tasks}
          onDelete={delelteTask}
          onToggle={toggleReminder}
        />
      ) : (
          "No task"
        )}
    </div>
  );
};

export default App;
