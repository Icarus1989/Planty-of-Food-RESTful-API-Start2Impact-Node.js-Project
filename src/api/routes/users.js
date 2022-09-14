const express = require("express");
const api = require("../../api");
const monk = require("monk");
const mongoose = require("mongoose");
const User = require("../models/User");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const router = express.Router();
// const app = express();

// mongoose.connect(
// 	`mongodb://localhost:27017/PoFTestDatabase`,
// 	() => {
// 		console.log("connected");
// 	},
// 	(error) => {
// 		console.log(error);
// 	}
// );

const {
	getAllUsers,
	getOneUser,
	postOneUser,
	putOneUser,
	deleteOneUser
} = require("../controllers/userController");

router.get("/", getAllUsers);

router.get("/:userid", getOneUser);

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
	postOneUser
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
	putOneUser
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
	deleteOneUser
);

// Delete all
// router.delete("/", (req, res) => {
// 	try {
// 		User.remove({}, (err, doc) => {
// 			if (err) {
// 				console.log(err);
// 			}
// 			res.json({
// 				message: "All data removed."
// 			});
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });
// Delete all

module.exports = router;
