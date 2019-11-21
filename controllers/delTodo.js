const handleDeltodo = (req, res, db, jwt) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			res.status(403).json('forbidden');
		}
		const { id } = req.params;
		db('todolist')
			.where('id', id)
			.del()
			.returning('*')
			.then(todo => {
				res.json(todo[0]);
			})
			.catch(err => res.status(400).json('unable to delete'));
	})
}
module.exports = {
	handleDeltodo: handleDeltodo
}