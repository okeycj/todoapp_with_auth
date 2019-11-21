const handleUpdatetodo = (req, res, db, jwt) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			res.status(403).json('forbidden');
		}
		const { id, completed } = req.body;
		console.log(id);
		db('todolist')
			.where('id', '=', id)
			.update({
				completed: completed
			})
			.then(todo => {
				res.json(todo[0]);
			})
			.catch(err => res.status(400).json('unable to update'));
	})
}
module.exports = {
	handleUpdatetodo: handleUpdatetodo
}