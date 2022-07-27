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

// testInsertData();

async function testInsertData() {
	try {
		const userTest = new User({
			firstname: "Usertest",
			lastname: "fromCode",
			username: "User0",
			address: "test@code.com",
			orders: [
				{
					orderid: "order00006",
					url: "none"
				}
			]
		});
		userTest.save((err, doc) => {
			if (err) {
				console.log(err);
			}
			console.log("Insered");
		});
		console.log(userTest);
	} catch (error) {
		console.log(error);
	}
}

// "firstname": "xxxxx",
// 	  "lastname": "xxxxx",
// 	  "username": "xxxxx",
// 	  "mailaddress": "one@one.com",
// 	  "orders": [
// 		{
// 			"orderid": "order00001",
// 			"url": "path"
// 		},
// 		{
// 			"orderid": "order00002",
// 			"url": "path"
// 		},
// 		{
// 			"orderid": "order00003",
// 			"url": "path"
// 		}
// 	]

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

router.put("/:userid", (req, res) => {});

router.delete("/:userid", (req, res) => {});

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
