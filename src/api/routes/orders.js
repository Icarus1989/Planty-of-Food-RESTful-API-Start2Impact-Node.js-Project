const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const router = express.Router();
const app = express();

router.get("/", async (req, res, next) => {
	try {
		const savedOrders = await Order.find();
		res.json(savedOrders);
	} catch (error) {
		next(error);
	}
});

router.get("/:ordNum", async (req, res, next) => {
	try {
		const number = await req.params.ordNum;
		const orderId = `order${String(number)}`;
		Order.find({ orderId: orderId }, (err, data) => {
			// gestire error con 404
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
			orderId: Joi.string().trim().required(),
			users: Joi.array()
				.items(
					Joi.object({
						username: Joi.string().trim().required(),
						products: Joi.array().items(
							Joi.object({
								productname: Joi.string().trim().required(),
								quantity: Joi.number().greater(0).integer().required()
							})
						)
					})
				)
				.required(),
			// createdAt: Joi.date().default(Date.now).required(),
			shipped: Joi.boolean()
		})
	}),
	async (req, res, next) => {
		try {
			const data = await req.body;
			const newOrder = new Order(data);
			newOrder.save((err, doc) => {
				if (err) {
					console.log(err);
				}
				res.json(newOrder);
				// Qui possibile Ric...
			});
		} catch (error) {
			next(error);
		}
	}
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
			shipped: Joi.boolean()
		})
	}),
	async (req, res, next) => {
		try {
			const data = await req.body;
			const number = await req.params.ordNum;
			const orderId = `order${String(number)}`;

			const orderChanged = await Order.findOneAndUpdate(
				{ orderId: orderId },
				data,
				{
					new: true
				}
			);

			res.json(orderChanged);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	"/:ordNum",
	celebrate({
		[Segments.BODY]: Joi.object({
			orderId: Joi.string().trim().required(),
			users: Joi.array()
				.items(
					Joi.object({
						username: Joi.string().trim().required(),
						products: Joi.array().items(
							Joi.object({
								productname: Joi.string().trim().required(),
								quantity: Joi.number().greater(0).integer().required()
							})
						)
					})
				)
				.required(),
			// createdAt: Joi.date().default(Date.now).required(),
			shipped: Joi.boolean()
		})
	}),
	async (req, res, next) => {
		try {
			const number = await req.params.ordNum;
			const orderId = `order${String(number)}`;
			const orderRemoved = await Order.findOneAndDelete({ orderId: orderId });
			res.json(orderRemoved);
		} catch (error) {
			next(error);
		}
	}
);

// Delete all
router.delete("/", (req, res) => {
	try {
		Order.remove({}, (err, doc) => {
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
// 	orderId: "order000002",
// 	users: [
// 		{
// 			username: "UserOne",
// 			products: [
// 				{
// 					productname: "Watermelon",
// 					quantity: 23
// 				},
// 				{
// 					productname: "Strawberries",
// 					quantity: 23
// 				}
// 			]
// 		}
// 	],
// 	shipped: false
// }

// body put = {
// 	users: {
// 		username: "User5",
// 		products: [
// 			{
// 				productname: "Strawberries",
// 				quantity: 5
// 			},
// 			{
// 				productname: "Watermelon",
// 				quantity: 5
// 			}
// 		]
// 	}
// };
