const router = require("express").Router();
const User = require("../models/user");
const Todos = require("../models/todos");
router.post("/addTask/", async (req, res) => {
  try {
    const { task, status, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const newTask = new Todos({
        task,
        status,
        user: existingUser,
      });
      await newTask.save().then(() => res.status(200).json({ newTask }));
      // existingUser.newTask.push(newTask);
      // existingUser
      //   .save()
      //   .then(() => res.status(200).json({ message: "added successfully" }));
      // res.status(200).json({ message: "create a task" });
    } else {
      res.status(400).json({ message: "create a account" });
    }
  } catch (error) {
    res.status(400).json({ message: "something went wrong..." });
  }
});
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { task, status } = req.body;
    const todo = await Todos.findByIdAndUpdate(req.params.id, {
      task,
      status,
    });
    todo.save().then(() => {
      res.status(200).json({ message: "Task Update Successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: "something went wrong..." });
  }
});
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { todos: req.params.id },
    });
    if (existingUser) {
      const deleteDate = await Todos.findByIdAndDelete(req.params.id);
      if (deleteDate) {
        res.status(200).json({ message: "delete successfully" });
      } else {
        res.status(400).json({ message: "there is no id" });
      }
    } else {
      res.status(400).json({ message: "create an account" });
    }
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
});
router.get("/getTask/:id", async (req, res) => {
  const todosId = await Todos.find({ user: req.params.id });
  res.status(200).json({ todos: todosId });
});
module.exports = router;
