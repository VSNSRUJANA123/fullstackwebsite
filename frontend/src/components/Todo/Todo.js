import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import "./update.css";
import "./todo.css";
import { ToastContainer, toast } from "react-toastify";
import Update from "./Update";
import axios from "axios";
let id = sessionStorage.getItem("id");
let toUpdateArray = [];
const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", status: "" });
  const [array, setArray] = useState([]);
  const Schange = (e) => {
    setInputs({ ...Inputs, status: e.target.value });
  };
  const change = (e) => {
    setInputs({ ...Inputs, title: e.target.value });
  };
  const submit = async () => {
    if (id) {
      if (Inputs.title !== "" && Inputs.status !== "") {
        await axios
          .post(`http://localhost:1000/todo/addTask/`, {
            task: Inputs.title,
            status: Inputs.status,
            id: id,
          })
          .then((res) => {
            toast.success("Added the task");
          })
          .catch((error) => {
            console.log("it is an error");
          });
        setArray([...array, Inputs]);
      } else {
        toast.warning("add the task and status");
      }
    } else {
      if (Inputs.title !== "" && Inputs.status !== "") {
        setArray([...array, Inputs]);
        toast.success("Add the task");
        toast.error("Your Task Is Not Saved!Please singup");
      } else {
        toast.warning("add the task and status");
      }
    }
    setInputs({ title: "", status: "" });
  };
  const del = async (Cardid) => {
    // array.splice(id, 1);
    // setArray([...array]);
    if (id) {
      await axios
        .delete(`http://localhost:1000/todo/deleteTask/${Cardid}`, {
          data: { id: id },
        })
        .then((res) => {
          toast.success("delete the task");
        })
        .catch((error) => {
          console.log("it is an error");
        });
    } else {
      toast.error("please signup! first");
    }
  };
  useEffect(() => {
    if (id !== null) {
      const fetch = async () => {
        await axios
          .get(`http://localhost:1000/todo/getTask/${id}`)
          .then((res) => {
            // console.log(res);
            setArray(res.data.todos);
          })
          .catch((error) => {
            console.log("it is an error");
          });
      };
      fetch();
    }
  }, [del, submit]);

  const dis = (value) => {
    document.getElementById("update-id").style.display = value;
  };
  const update = (value) => {
    toUpdateArray = array[value];
  };
  const close = (value) => {
    document.getElementById("update-id").style.display = value;
  };
  return (
    <div className="todo-bg">
      <div className="d-flex flex-column justify-content-center m-3 p-3">
        <input
          placeholder="enter your task"
          className="mb-3 p-2"
          type="text"
          name="title"
          value={Inputs.title}
          onChange={change}
        />
        <input
          placeholder="enter your status"
          className="mb-3 p-2"
          type="text"
          name="title"
          value={Inputs.status}
          onChange={Schange}
        />
        <span>Status : Done,Todo,inProgress</span>
        <ToastContainer />
        <div className="d-flex justify-content-end">
          <button className="add-btn" onClick={submit}>
            add
          </button>
        </div>
        <div className="task-card">
          {array.length !== 0 &&
            array.map((items, index) => {
              return (
                <TodoCard
                  key={index}
                  items={items}
                  id={items._id}
                  delid={del}
                  display={dis}
                  updateId={index}
                  toBeUpdate={update}
                />
              );
            })}
        </div>
      </div>
      <div className="update-bg" id="update-id">
        <Update closeBtn={close} update={toUpdateArray} />
      </div>
    </div>
  );
};
export default Todo;
