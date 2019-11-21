const handleRegister = (req, res, db, bcrypt, jwt) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission')
	}
	const hash = bcrypt.hashSync(password);
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date()
					})
					.then(user => {
						console.log(user[0].id);
						const userId = user[0].id;
						jwt.sign({user: userId}, 'secretkey', (err, token) => {
							res.json({
								token
							})
						})
					})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to register'));
}

module.exports = {
	handleRegister: handleRegister
}