const handleSignin = (req, res, db, bcrypt, jwt) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
						const userId = user[0].id;
						jwt.sign({user: userId}, 'secretkey', (err, token) => {
							res.json({
								token
							})
						})
					})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials');
			}
		})
		.catch(err => res.status(400).json("wrong credentials"))
}

module.exports = {
	handleSignin: handleSignin
}