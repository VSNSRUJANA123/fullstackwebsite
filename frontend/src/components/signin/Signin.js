import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { authActions } from "../../store";
const Signin = () => {
  const dispatch = useDispatch();
  const [array, setArray] = useState({ email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setArray({ ...array, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:1000/api/signin`, {
        email: array.email,
        password: array.password,
      })
      .then((res) => {
        sessionStorage.setItem("id", res.data.others._id);
        console.log("lookid");
        dispatch(authActions.login());
        toast.success("user login successfully");
        setArray({ email: "", password: "" });
      })
      .catch((error) => {
        toast.error("no user exist or wrong password");
      });
  };
  return (
    <div className="m-3 p-5 ">
      <ToastContainer />
      <h1 className=" d-flex signup-title ">
        <b>Sign In</b>
      </h1>
      <form className="d-flex flex-column m-5 ">
        <input
          className="m-1 p-2"
          name="email"
          type="email"
          placeholder="Enter email"
          value={array.email}
          onChange={change}
        />
        <input
          className="m-1 p-2"
          type="password"
          name="password"
          value={array.password}
          onChange={change}
          placeholder="Enter password"
        />
        <button className="m-3 sign-btn" onClick={submit}>
          Signin
        </button>
      </form>
    </div>
  );
};

export default Signin;
