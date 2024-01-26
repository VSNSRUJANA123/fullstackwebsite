import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homePage">
      <h1>
        <b>Organize Your Work and Life,Finally.</b>
      </h1>
      <p>
        Become focused ,and calm with todo app. The world's #1 task manager app.
      </p>
      <Link to="/todo">
        <button className="button">Make Todo List</button>
      </Link>
    </div>
  );
};

export default Home;
