const express = require("express");

const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

async function getAllUsers(req, res, next) {
	try {
		const accounts = await User.find({});
		res.json(accounts);
	} catch (error) {
		next(error);
	}
}

async function getOneUser(req, res, next) {
	try {
		const username = await req.params.userid;
		console.log(username);
		User.find({ username: username }, (err, data) => {
			// gestire error
			console.log(data);
			res.status(200).json(data);
		});
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
			newUser.save((err, doc) => {
				if (err) {
					console.log(err);
				}
				res.json(newUser);
			});
		} else {
			res.json({
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