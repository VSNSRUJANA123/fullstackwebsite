import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const history = useNavigate();
  const [array, setArray] = useState({ email: "", username: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setArray({ ...array, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:1000/api/register`, array)
      .then((res) => {
        toast.success(res.data.message);
        setArray({ email: "", username: "", password: "" });
        history("/signin");
      })
      .catch((error) => {
        toast.error("User or Email Already Exists");
      });
  };
  return (
    <div className="sign-bg  p-5">
      <ToastContainer />
      <h1 className=" d-flex signup-title ">
        <b>Sign Up</b>
      </h1>
      <form className="d-flex flex-column m-5 ">
        <input
          className="m-1 p-2"
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={change}
          value={array.email}
        />
        <input
          className="m-1 p-2"
          type="username"
          name="username"
          placeholder="Enter name"
          onChange={change}
          value={array.username}
        />
        <input
          className="m-1 p-2"
          type="password"
          name="password"
          placeholder="Enter password"
          value={array.password}
          onChange={change}
        />
        <p>Fill up all then appear the button</p>
        {array.username && array.email && array.password && (
          <button className="m-3 sign-btn" onClick={submit}>
            Signup
          </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
