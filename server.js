const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const pg = require('pg');
const knex = require('knex');
const jwt = require('jsonwebtoken')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const delTodo = require('./controllers/delTodo');
const addTodo = require('./controllers/addTodo');
const todolist = require('./controllers/todolist');
const updateTodo = require('./controllers/updateTodo');
// const verifyToken = require('./controllers/verifyToken');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'okey1234',
		database : 'todo'
	}
});

const app = express();

const verifyToken = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.status(403).json('forbidden');
	}
}
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
	res.send('cool');
}) 

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt, jwt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, jwt) })

app.get('/todolist', verifyToken, (req, res) => { todolist.handleTodolist(req, res, db, jwt) })

app.post('/addtodo', verifyToken, (req, res) => { addTodo.handleAddtodo(req, res, db, jwt) })

app.delete('/deltodo/:id', verifyToken, (req, res) => { delTodo.handleDeltodo(req, res, db, jwt) })

app.put('/updatetodo/:id', verifyToken, (req, res) => { updateTodo.handleUpdatetodo(req, res, db, jwt) })


app.listen(process.env.PORT || 3001, () => {
	console.log('app is running on port 3001');
})
