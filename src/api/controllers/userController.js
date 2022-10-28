const User = require("../models/User");

async function getAllUsers(req, res, next) {
	try {
		const accounts = await User.find({});
		res.status(200).json(accounts);
	} catch (error) {
		next(error);
	}
}

async function getOneUser(req, res, next) {
	try {
		const username = await req.params.userid;
		const result = await User.findOne({ username: username });
		if (result !== null) {
			res.status(200).json(result);
		} else {
			res.status(404).json({ message: `${username} not found.` });
		}
	} catch (error) {
		next(error);
	}
}

async function postOneUser(req, res, next) {
	try {
		const data = await req.body;
		const userExists = await User.findOne({
			username: data["username"]
		});
		if (userExists == null) {
			const newUser = new User(await data);
			const savedUser = await newUser.save();
			res.status(200).json(newUser);
		} else {
			res.status(200).json({
				message: `The user ${data["username"]} already exists.`
			});
		}
	} catch (error) {
		next(error);
	}
}

async function putOneUser(req, res, next) {
	try {
		const username = await req.params.username;
		const data = await req.body;
		const userChanged = await User.findOneAndUpdate(
			{
				username: username
			},
			data,
			{
				new: true
			}
		);
		res.json(userChanged);
	} catch (error) {
		next(error);
	}
}

async function deleteOneUser(req, res, next) {
	try {
		const username = req.params.username;
		const userRemoved = await User.findOneAndDelete({
			username: username
		});
		res.json(userRemoved);
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllUsers,
	getOneUser,
	postOneUser,
	putOneUser,
	deleteOneUser
};
