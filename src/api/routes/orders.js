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

// const {
// 	OrderManagerClass,
// 	ProductUpdaterClass,
// 	UserUpdaterClass
// } = require("./classes");

const router = express.Router();
// const app = express();

router.get("/", getAllOrders);

router.get("/:ordNum", getOneOrder);

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
	"/:ordNum",
	celebrate({
		[Segments.BODY]: Joi.object({
			orderId: Joi.string().trim(),
			users: Joi.array().items(
				Joi.object({
					username: Joi.string().trim(),
					products: Joi.array().items(
						Joi.object({
							productname: Joi.string().trim(),
							quantity: Joi.number().greater(0).integer()
						})
					)
				})
			),
			// createdAt: Joi.date().default(Date.now).required(),
			totalcost: Joi.number(),
			shipped: Joi.boolean(),
			date: Joi.date()
		})
	}),
	putOneOrder
);

router.delete(
	"/:ordNum",
	celebrate({
		[Segments.BODY]: Joi.object({
			orderId: Joi.string().trim(),
			users: Joi.array().items(
				Joi.object({
					username: Joi.string().trim(),
					products: Joi.array().items(
						Joi.object({
							productname: Joi.string().trim(),
							quantity: Joi.number().greater(0).integer()
						})
					)
				})
			),
			// createdAt: Joi.date().default(Date.now).required(),
			totalcost: Joi.number(),
			shipped: Joi.boolean(),
			date: Joi.date()
		})
	}),
	deleteOneOrder
);

// Delete all
// router.delete("/", (req, res) => {
// 	try {
// 		Order.remove({}, (err, doc) => {
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

// -----> continuare a dividere routes da controller anche per altri file <-----
