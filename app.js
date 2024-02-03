// app.js
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let todos = [];

// Read operation - View all todos
app.get('/', (req, res) => {
  res.render('index', { todos });
});

// Create operation - Add new todo
app.post('/add', (req, res) => {
  const newTodo = req.body.newTodo;
  todos.push(newTodo);
  res.redirect('/');
});

// Read operation - View a specific todo
app.get('/view/:id', (req, res) => {
  const todoId = req.params.id;
  const todo = todos[todoId];
  res.render('view', { todo, todoId });
});

// Update operation - Edit a todo
app.post('/edit/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body.updatedTodo;
  todos[todoId] = updatedTodo;
  res.redirect('/');
});

// Delete operation - Delete a todo
app.post('/delete/:id', (req, res) => {
  const todoId = req.params.id;
  todos.splice(todoId, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
