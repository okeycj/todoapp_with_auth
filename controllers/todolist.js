const handleTodolist = (req, res, db, jwt) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			res.status(403).json('forbidden');
		}
		db.select('*').from('todolist')
			.where('user_id', '=', authData.user)
			.then(list => {
		// console.log(list);
				if (list.length) {
					res.json(list)
				} else if(list.length == 0) {
					res.json(list)
				} else {
					res.status(400).json('not found');
				}
			})
			.catch(err => res.status(400).json('error getting list'));
	})
}

module.exports = {
	handleTodolist: handleTodolist
}