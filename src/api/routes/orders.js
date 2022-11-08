const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const {
	getAllOrders,
	getOneOrder,
	postOneOrder,
	putOneOrder,
	deleteOneOrder
} = require("../controllers/orderController");

const {
	OrderManagerClass,
	ProductUpdaterClass,
	UserUpdaterClass
} = require("../routes/classes");

const router = express.Router();

router.get("/", getAllOrders);

router.get("/:ordnum", getOneOrder);

router.post(
	"/",
	celebrate({
		[Segments.BODY]: Joi.object({
			orderid: Joi.string().trim().required(),
			users: Joi.array()
				.items(
					Joi.object({
						username: Joi.string().trim().required(),
						products: Joi.array().items(
							Joi.object({
								productname: Joi.string().trim().required(),
								quantity: Joi.number().greater(0).integer().required()
							})
						),
						cost: Joi.number().greater(0)
					})
				)
				.required(),
			totalcost: Joi.number().greater(0),
			shipped: Joi.boolean(),
			date: Joi.date()
		})
	}),
	postOneOrder
);

router.put(
	"/:ordnum",
	celebrate({
		[Segments.BODY]: Joi.object({
			orderid: Joi.string().trim(),
			users: Joi.array().items(
				Joi.object({
					username: Joi.string().trim(),
					products: Joi.array().items(
						Joi.object({
							productname: Joi.string().trim(),
							quantity: Joi.number().greater(0).integer()
						})
					),
					cost: Joi.number().greater(0)
				})
			),
			totalcost: Joi.number().greater(0),
			shipped: Joi.boolean(),
			date: Joi.date()
		})
	}),
	putOneOrder
);

router.delete("/:ordnum", deleteOneOrder);

module.exports = router;
