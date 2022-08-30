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
// const ProductUpdaterClass = require("./classes");

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
		const number = req.params.ordNum;
		const orderId = `order${String(number)}`;
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
			totalprice: Joi.number().greater(0),
			shipped: Joi.boolean(),
			date: Joi.date()
		})
	}),
	async (req, res, next) => {
		try {
			const data = await req.body;

			const prodUpdater = new ProductUpdaterClass(data, Product, Order, res);
			const userUpdater = new UserUpdaterClass(data, User, Order, res);

			// 	// Qui modifica quantità dei vari products aggiunti all'ordine - diminuire...
			// 	// quantità dispinibile

			const orderExists = await prodUpdater.orderExistsCheck();
			const existCheck = await userUpdater.usersExistCheck();

			// ----> TEST su MongoDB Compass

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
				// Testing solution for bug
				if (numOfErrs == 0) {
					await userUpdater.updateAccountsNewOrder();
				} else if (numOfErrs > 0) {
					return;
				}
				// Testing solution for bug
			}

			// Qui possibile Ric...
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
			const number = await req.params.ordNum;
			const orderId = `order${String(number)}`;
			// console.log(orderId);

			// da tenere -->
			const orderRemoved = await Order.findOneAndDelete({ orderid: orderId });
			// <--- da tenere

			// sistemata ricerca ordine da cancellare --> orderId No --> orderid
			// ripartire da creare metodo nelle classi per eliminare order dagli users
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
			// const existCheck = await userUpdater.usersExistCheck();
			const updates = await userUpdater.updateAccountsDelOrder();
			// qui eliminazione ordine da users interessati
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
