const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const router = express.Router();
const app = express();

function filterBy(listOrders, query, value) {
	let arr = listOrders.filter((elem) => {
		// elem[query];
		if (elem[query]) {
			return true;
		} else {
			return false;
		}
	});
	return arr;
}

function reorderDescent(a, b) {
	if (a.orderId.slice(5) > b.orderId.slice(5)) {
		return 1;
	} else if (a.orderId.slice(5) < b.orderId.slice(5)) {
		return -1;
	}
}

function reorderAscedent(a, b) {
	if (a.orderId.slice(5) > b.orderId.slice(5)) {
		return -1;
	} else if (a.orderId.slice(5) < b.orderId.slice(5)) {
		return 1;
	}
}

router.get("/", async (req, res, next) => {
	try {
		const query = req.query;
		let savedOrders = await Order.find({});
		let results = [];

		// continuare test su i due switch

		if (query.filter || query.order) {
			let mapped;
			switch (query.filter) {
				case "productname":
					mapped = await savedOrders.map((elem) => {
						return elem["users"][0]["products"];
					});
					for (let elem of mapped) {
						for (let i = 0; i < elem.length; i++) {
							if (
								elem[i]["productname"] ==
								`${String(query.value)[0].toUpperCase()}${String(
									query.value
								).slice(1)}`
							) {
								results.push(savedOrders[mapped.indexOf(elem)]);
							}
						}
					}
					break;
				case "username":
				case "products":
					mapped = await savedOrders.map((elem) => {
						return elem["users"][0];
					});
					for (let elem of mapped) {
						if (elem["username"] == query.value) {
							results.push(savedOrders[mapped.indexOf(elem)]);
						}
					}
					break;
				case "_id":
				case "orderId":
				case "shipped":
				case "createAt":
					results = await Order.find({
						[query.filter]: query.value
					});
					break;
				// default:
				// 	res.status(200).json(savedOrders);
			}

			switch (query.order) {
				case "ascendent":
					if (results.length == 0) {
						results = savedOrders;
					}
					const ascOrders = results.sort(reorderAscedent);
					res.json(ascOrders);
					break;
				case "descendent":
					if (results.length == 0) {
						results = savedOrders;
					}
					const descOrders = results.sort(reorderDescent);
					res.json(descOrders);
					break;
				default:
					res.status(200).json(results);
			}
		} else {
			res.status(200).json(savedOrders);
		}

		// --- funzionante ---

		// if (query.filter || query.order) {
		// 	if (query.filter == "productname") {
		// 		let mapped = await savedOrders.map((elem) => {
		// 			return elem["users"][0]["products"];
		// 		});
		// 		for (let elem of mapped) {
		// 			for (let i = 0; i < elem.length; i++) {
		// 				// console.log(elem[i]["productname"]);
		// 				if (
		// 					elem[i]["productname"] ==
		// 					`${String(query.value)[0].toUpperCase()}${String(
		// 						query.value
		// 					).slice(1)}`
		// 				) {
		// 					results.push(savedOrders[mapped.indexOf(elem)]);
		// 				}
		// 			}
		// 		}
		// 	} else if (query.filter == "username" || query.filter == "products") {
		// 		let mapped = await savedOrders.map((elem) => {
		// 			return elem["users"][0];
		// 		});
		// 		for (let elem of mapped) {
		// 			if (elem["username"] == query.value) {
		// 				results.push(savedOrders[mapped.indexOf(elem)]);
		// 			}
		// 		}
		// 	} else if (
		// 		query.filter == "_id" ||
		// 		query.filter == "orderId" ||
		// 		query.filter == "shipped" ||
		// 		query.filter == "createdAt"
		// 	) {
		// 		results = await Order.find({
		// 			[query.filter]: query.value
		// 		});
		// 	}

		// 	if (query.order) {
		// 		if (results.length == 0) {
		// 			results = savedOrders;
		// 		}
		// 		if (query.order == "descent") {
		// 			const orders = results.sort(reorderDescent);
		// 			return res.json(orders);
		// 		} else if (query.order == "ascendent") {
		// 			const orders = results.sort(reorderAscedent);
		// 			return res.json(orders);
		// 		}
		// 	} else if (query.order == undefined) {
		// 		res.status(200).json(results);
		// 	}
		// } else {
		// 	res.status(200).json(savedOrders);
		// }
		// --- funzionante ---
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
