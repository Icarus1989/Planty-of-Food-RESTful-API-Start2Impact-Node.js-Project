const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const {
	OrderManagerClass,
	ProductUpdaterClass,
	UserUpdaterClass
} = require("../routes/classes");

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

module.exports = router;
