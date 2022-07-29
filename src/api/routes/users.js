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
	try {
		const accounts = await User.find({});
		res.json(accounts);
	} catch (error) {
		next(error);
	}
});

router.get("/:userid", async (req, res, next) => {
	try {
		const username = await req.params.userid;
		console.log(username);
		User.find({ username: username }, (err, data) => {
			// gestire error
			console.log(data);
			res.json(data);
		});
	} catch (error) {
		next(error);
	}
});

router.post(
	"/",
	celebrate({
		[Segments.BODY]: Joi.object({
			firstname: Joi.string().required(),
			lastname: Joi.string().required(),
			username: Joi.string().required(),
			address: Joi.string().email().required(),
			// createdAt: Joi.date().default(Date.now).required(),
			orders: Joi.array()
				.items(
					Joi.object({
						orderid: Joi.string().required(),
						url: Joi.string().required()
					})
				)
				.required()
		})
	}),
	async (req, res, next) => {
		try {
			const data = await req.body;
			const newUser = new User(await data);
			newUser.save((err, doc) => {
				if (err) {
					console.log(err);
				}
				res.json(newUser);
			});
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	"/:username",
	celebrate({
		[Segments.BODY]: Joi.object({
			firstname: Joi.string(),
			lastname: Joi.string(),
			username: Joi.string().required(),
			address: Joi.string().email(),
			// createdAt: Joi.date().default(Date.now).required(),
			orders: Joi.array().items(
				Joi.object({
					orderid: Joi.string(),
					url: Joi.string()
				})
			)
		})
	}),
	async (req, res, next) => {
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
);

router.delete(
	"/:username",
	celebrate({
		[Segments.BODY]: Joi.object({
			firstname: Joi.string(),
			lastname: Joi.string(),
			username: Joi.string().required(),
			address: Joi.string().email(),
			orders: Joi.array().items(
				Joi.object({
					orderid: Joi.string(),
					url: Joi.string()
				})
			)
		})
	}),
	async (req, res, next) => {
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
);

// Delete all
router.delete("/", (req, res) => {
	try {
		User.remove({}, (err, doc) => {
			if (err) {
				console.log(err);
			}
			res.json({
				message: "All data removed."
			});
		});
	} catch (error) {
		next(error);
	}
});
// Delete all

module.exports = router;

// body post = {
// "firstname": "UserFromInsomnia",
// "lastname": "from req.body",
// "username": "User4",
// "address": "test@request.com",
// "orders": [
// 	{
// 		"orderid": "00008",
// 		"url": "none"
// 	}
// ]
// };

// body put = {
// 	"address": "userzero@testcode.com"
// };
