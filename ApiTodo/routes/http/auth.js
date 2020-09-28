const express = require('express');
const routes = express.Router();
const multer = require('multer');
const upload = multer();

const authCtrl = require('controllers/http/auth');
const toDoListCtrl = require('controllers/http/todolist');

routes.all('/', function(req, res, next) {
  res.send({ response: "I am alive" }).status(200);
});
/* login user (find by login + email) */
routes.post('/auth/', upload.none(), async (req, res, next) => {
  const { login, email } = req.body;
  const { auth: findUser } = authCtrl;
  const result = await findUser(login, email);
  res.json(result);
});

/* get toDo List if exist */
routes.post('/getToDoList/', upload.none(), async (req, res, next) => {
  const { user_id } = req.body;
  const { getToDoList: findList } = toDoListCtrl;
  const result = await findList(user_id);
  res.json(result);
});

/* add ToDo Item */
routes.post('/addToDoItem/', upload.none(), async (req, res, next) => {
  const { userId, text } = req.body;
  const { addToDoItem: addItem } = toDoListCtrl;
  console.log('authRoute', userId, text);
  const result = await addItem(userId, text);
  res.json(result);
});

/* edit one row from list use user id and list id */
routes.post('/changeToDoItem/', upload.none(), async (req, res, next) => {
  const { item_id, text, status } = req.body;
  const { changeToDoItem: changeItem } = toDoListCtrl;
  const result = await changeItem(item_id, text, status);
  res.json(result);
});

/* delite one row from list use item id */
routes.post('/changeToDoItemDelit/', upload.none(), async (req, res, next) => {
  const { item_id } = req.body.item_id;
  console.log('route - ', req.body);
  const { changeToDoItemDelit: changeItemDelit } = toDoListCtrl;
  const result = await changeItemDelit(req.body.item_id);
  res.json(result);
});

module.exports = routes;
