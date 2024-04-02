import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
  const [val, setVal] = useState("");
  const [tasks, setTasks] = useState([]);

  const saveData = (newTasks) => {
    localStorage.setItem("data", JSON.stringify(newTasks));
  };

  useEffect(() => {
    if (localStorage.getItem("data")) {
      let data = JSON.parse(localStorage.getItem("data"));
      setTasks(data);
    }
  }, [saveData]);

  function handleClick() {
    console.log(val);
    let newTasks = [...tasks, { taskName: `${val}`, isCompleted: false }];
    setTasks(newTasks);
    setVal("");
    saveData(newTasks);
  }

  function toggleComplete(i) {
    let newTask = [...tasks];
    newTask[i].isCompleted = !newTask[i].isCompleted;
    saveData(newTask);
  }

  function deleteTask(index) {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    saveData(newTasks);
  }

  return (
    <>
      <Header />
      <div className="w-full h-[100px] linetr flex justify-center items-end">
        <input
          type="text"
          placeholder="Enter your Task"
          className="w-[280px] px-4 py-2 outline-none border-[2px] bg-slate-50 rounded-l-lg"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button
          className="px-5 py-2 rounded-r-lg outline-none border-2 border-blue-600 bg-blue-500 text-white font-bold"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
      <Search input={val} />
      <ul className="max-w-[400px] m-auto mt-[40px] text-xl break-words">
        {tasks.length > 0 ? (
          tasks.map(function (task, i) {
            return (
              <li
                key={i}
                className="w-full mb-2 flex justify-between items-center bg-slate-100"
              >
                <span
                  className={` max-w-[85%] px-4 py-2 m-2 text-xl break-words ${
                    task.isCompleted && " line-through opacity-50"
                  } `}
                  onClick={() => toggleComplete(i)}
                >
                  {task.taskName}
                </span>
                <button
                  className="w-[10%] mr-1 rounded-full bg-transparent border-none cursor-pointer"
                  onClick={() => deleteTask(i)}
                >
                  <i className="ri-close-circle-line text-2xl"></i>
                </button>
              </li>
            );
          })
        ) : (
          <h1 className="text-center">No Task Available </h1>
        )}
      </ul>
    </>
  );
}

export default App;
