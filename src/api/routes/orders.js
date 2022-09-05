const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const {
	OrderManagerClass,
	ProductUpdaterClass,
	UserUpdaterClass
} = require("./classes");

const router = express.Router();
const app = express();

router.get("/", async (req, res, next) => {
	try {
		const query = req.query;
		let savedOrders = await Order.find({});

		const orderManager = new OrderManagerClass(
			res,
			savedOrders,
			query.filter,
			query.value,
			query.orderby,
			query.sort
		);

		orderManager.parametersHandling();
	} catch (error) {
		next(error);
	}
});
//  http://localhost:5000/api/v1/orders-archieve?filter=productname&value=bananas&order=ascendent

// test http://localhost:5000/api/v1/orders-archieve?filter=productname&value=bananas&orderby=orderid&sort=ascending

router.get("/:ordNum", async (req, res, next) => {
	try {
		const orderNumber = req.params.ordNum;
		const orderId = `order${String(orderNumber)}`;
		console.log(orderId);
		Order.findOne({ orderid: orderId }, (err, data) => {
			if (err) {
				res.status(200).json({
					message: `Error in searching ${orderId}`
				});
			} else if (data == null) {
				res.status(200).json({
					message: `${orderId} not exists`
				});
			} else {
				res.json(data);
			}
		});
	} catch (error) {
		next(error);
	}
});

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
	async (req, res, next) => {
		if (!req.body) {
			res.status(200).json({
				message: `For post an order please use this JSON structure in the request body: {
				"orderid": String,
				"users": [
					{
						"username": String,
						"products": [
							{
								"productname": String,
								"quantity": Number
							}
						],
						"cost": Number (Automatically added)
					}
				],
				"totalcost": Number (Automatically added),
				"shipped": Boolean,
				"date": (Automatically added)
			}`
			});
		}
		try {
			const data = await req.body;

			const prodUpdater = new ProductUpdaterClass(data, Product, Order, res);
			const userUpdater = new UserUpdaterClass(data, User, Order, res);

			const orderExists = await prodUpdater.orderExistsCheck();
			const existCheck = await userUpdater.usersExistCheck();

			if (Object.keys(existCheck).length > 0) {
				res.status(200).json(existCheck);
			} else if (orderExists !== null) {
				res.status(200).json({
					message: "OrderId already exists"
				});
			} else {
				await prodUpdater.searchProd();
				await prodUpdater.createResults();
				const numOfErrs = await prodUpdater.createNewOrder();
				if (numOfErrs == 0) {
					await userUpdater.updateAccountsNewOrder();
				} else if (numOfErrs > 0) {
					return;
				}
			}

			// Qui possibile Ric...
		} catch (error) {
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
			totalcost: Joi.number(),
			shipped: Joi.boolean(),
			date: Joi.date()
		})
	}),
	async (req, res, next) => {
		try {
			const data = await req.body;
			const orderNumber = await req.params.ordNum;
			const orderId = `order${String(orderNumber)}`;

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
	async (req, res, next) => {
		try {
			const orderNumber = await req.params.ordNum;
			const orderId = `order${String(orderNumber)}`;
			const orderRemoved = await Order.findOneAndDelete({ orderid: orderId });

			const userUpdater = new UserUpdaterClass(
				await orderRemoved,
				User,
				Order,
				res
			);
			const prodUpdater = new ProductUpdaterClass(
				await orderRemoved,
				Product,
				Order,
				res
			);
			const updates = await userUpdater.updateAccountsDelOrder();
			const restores = await prodUpdater.restoreQuantities();

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
