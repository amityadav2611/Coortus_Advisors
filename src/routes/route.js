const express = require('express');
const router = express.Router();

const {loginTodo, createTodo, updateTodo, getTodo, deleteTodo} = require("../controllers/controller")

//directApi
// router.post("/directory/list", getdirectory)
// router.post("/directory/create", createDirectory)
// router.post("/directory/remove", removeDirectory)


//todoApi
router.post("/signin", loginTodo)
router.post("/create-todo", createTodo )
router.patch("/update-todo/:id", updateTodo)
router.get("/todo", getTodo)
router.delete("/todo/:id", deleteTodo)



module.exports = router;


// Endpoints:

// /directory/list
// /directory/create
// /directory/remove
// /todo-item/create
// /todo-item/mark-as-done
// /todo-item/mark-as-not-done
// /todo-item/move-to-directory
// /todo-item/list 