const express = require("express");
const api = require("../../api");
const monk = require("monk");
const mongoose = require("mongoose");
const User = require("../models/User");
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
	// res.json({
	// 	message: "Welcome to user GET ALL section"
	// });
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

router.post("/", (req, res) => {
	try {
		const userTest = new User({
			firstname: "Usertest",
			lastname: "fromCode",
			username: "User0",
			address: "test@code.com",
			orders: [
				{
					orderid: "00006",
					url: "none"
				}
			]
		});
		userTest.save((err, doc) => {
			if (err) {
				console.log(err);
			}
			res.json(userTest);
		});
		// console.log(userTest);
	} catch (error) {
		console.log(error);
	}
});

router.put("/:username", async (req, res) => {
	const username = req.params.username;
	const userChanged = await User.findOneAndUpdate(
		{
			username: username
		},
		{
			address: "userzero@testcode.com"
		},
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
