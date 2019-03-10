const jwt = require('jsonwebtoken');

const generateToken = userId => {
	if (process.env.JWT_SECRET) {
		const secret = process.env.JWT_SECRET;
		const payload = {
			userId
		};
		const token = jwt.sign(payload, secret, {
			expiresIn: '15day'
		});
		return token;
	} else {
		throw new Error('Erreur génération de token');
	}
};

const validateToken = async (req, res, next) => {
	if (
		req.path === '/login' ||
		req.path === '/auth' ||
		req.path === '/register' ||
		req.path === '/articles' ||
		req.path === '/profil'
	) {
		next();
	} else if (!req.cookies.token) {
		res.redirect('/');
	} else {
		const { token } = req.cookies;

		const secret = process.env.JWT_SECRET;
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				console.log('JWT invalide', req.path, err);
				res.clearCookie();
				return res.redirect('/');
			}
			console.log('Token validé pour', req.path);

			const session = { userId: decoded.userId };
			req.session = session;
			next();
		});
	}
};

module.exports = { generateToken, validateToken };
