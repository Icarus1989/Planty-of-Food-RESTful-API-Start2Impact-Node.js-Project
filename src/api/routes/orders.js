const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const OrderClass = require("./classes");

const router = express.Router();
const app = express();

router.get("/", async (req, res, next) => {
	try {
		const query = req.query;
		let savedOrders = await Order.find({});

		const orderManager = new OrderClass(
			res,
			savedOrders,
			query.filter,
			query.value,
			query.order
		);

		if (query.filter && query.value == undefined) {
			orderManager.missParam("&value=");
		} else if ((query.filter && query.value) || query.order) {
			const ordersArchived = await orderManager.determinate();
			// console.log(ordersArchived);
			if (ordersArchived < 1) {
				await orderManager.noProducts();
			} else {
				await orderManager.ordering(ordersArchived);
				await orderManager.createResponse(ordersArchived);
			}
		} else if (
			query.filter == undefined &&
			query.value == undefined &&
			query.order
		) {
			await orderManager.ordering(savedOrders);
			await orderManager.createResponse(savedOrders);
		} else if (
			query.filter == undefined &&
			query.value == undefined &&
			query.order == undefined
		) {
			orderManager.createResponse(savedOrders);
		}
	} catch (error) {
		next(error);
	}
});
// test http://localhost:5000/api/v1/orders-archieve?filter=productname&value=bananas&order=ascendent

router.get("/:ordNum", async (req, res, next) => {
	try {
		const number = await req.params.ordNum;
		const orderId = `order${String(number)}`;
		Order.find({ orderId: orderId }, (err, data) => {
			// gestire error con 404
			// console.log(data);
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
			shipped: Joi.boolean()
			// createdAt: Joi.date().default(Date.now).required()
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
				res.status(200).json(newOrder);
				// Qui possibile Ric...
			});
		} catch (error) {
			// testing
			res.status(404).json({ message: "Problem occured" });
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

			res.status(200).json(orderChanged);
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
			res.status(200).json(orderRemoved);
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

// body post =
// {
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
