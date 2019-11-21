const handleAddtodo = (req, res, db, jwt) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			res.status(403).json('forbidden');
		}
		console.log(authData)
		const { title, completed } = req.body;
		if (!title || !completed) {
			return res.status(400).json('incorrect form submission')
		}
		db('todolist')
			.returning('*')
			.insert({
				title: title,
				completed: completed,
				user_id: authData.user,
				created_at: new Date()
			})
		.then(todo => {
			res.json(todo[0]);
		})
		.catch(err => res.status(400).json('unable to add todo'));
	})
}
module.exports = {
	handleAddtodo: handleAddtodo
}