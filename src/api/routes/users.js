const express = require("express");
const api = require("../../api");
const monk = require("monk");
const mongoose = require("mongoose");
const User = require("../models/User");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const router = express.Router();
const app = express();

// mongoose.connect(
// 	`mongodb://localhost:27017/PoFTestDatabase`,
// 	() => {
// 		console.log("connected");
// 	},
// 	(error) => {
// 		console.log(error);
// 	}
// );

router.get("/", async (req, res, next) => {
	const accounts = await User.find({});
	res.json(accounts);
});

router.get("/:userid", async (req, res, next) => {
	const username = await req.params.userid;
	console.log(username);
	User.find({ username: username }, (err, data) => {
		// gestire error
		console.log(data);
		res.json(data);
	});
});

router.post("/", async (req, res) => {
	try {
		// body = {
		// 	"firstname": "UserFromInsomnia",
		// 	"lastname": "from req.body",
		// 	"username": "User4",
		// 	"address": "test@request.com",
		// 	"orders": [
		// 		{
		// 			"orderid": "00008",
		// 			"url": "none"
		// 		}
		// 	]
		// };
		const data = await req.body;
		const newUser = new User(await data);
		newUser.save((err, doc) => {
			if (err) {
				console.log(err);
			}
			res.json(newUser);
		});
	} catch (error) {
		console.log(error);
	}
});

router.put("/:username", async (req, res) => {
	const username = await req.params.username;
	const data = await req.body;
	// body = {
	// 	"address": "userzero@testcode.com"
	// };
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
});

router.delete("/:username", async (req, res) => {
	const username = req.params.username;
	const userRemoved = await User.findOneAndDelete({
		username: username
	});
	res.json(userRemoved);
});

// Delete all
router.delete("/", (req, res) => {
	User.remove({}, (err, doc) => {
		if (err) {
			console.log(err);
		}
		res.json({
			message: "All data removed."
		});
		// console.log("Insered");
	});
});
// Delete all

module.exports = router;
