import { useState, useEffect } from "react";
import "./update.css";
import axios from "axios";
import { toast } from "react-toastify";
const Update = ({ closeBtn, update }) => {
  useEffect(() => {
    setInputs({ task: update.task, status: update.status });
  }, [update]);
  const [Inputs, setInputs] = useState({
    task: update.task,
    status: update.status,
  });
  const change = (e) => {
    setInputs({ ...Inputs, task: e.target.value });
  };
  const Schange = (e) => {
    setInputs({ ...Inputs, status: e.target.value });
  };
  const submit = async () => {
    await axios
      .put(`http://localhost:1000/todo/updateTask/${update._id}`, Inputs)
      .then((res) => {
        toast.success("your task updated");
      })
      .catch(() => {
        console.log("error occurred");
      });
    closeBtn("none");
  };
  return (
    <>
      <h1>Update Your Task</h1>
      <input
        placeholder="enter your task"
        name="task"
        value={Inputs.task}
        onChange={change}
      />
      <input
        placeholder="enter status"
        name="status"
        value={Inputs.status}
        onChange={Schange}
      />
      <div className="update-btn">
        <button onClick={submit}>update</button>
        <button
          onClick={() => {
            closeBtn("none");
          }}
        >
          close
        </button>
      </div>
    </>
  );
};

export default Update;
