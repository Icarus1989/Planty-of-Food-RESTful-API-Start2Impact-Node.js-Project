const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const router = express.Router();
const app = express();

// testInsertData();

// async function testInsertData() {
// 	try {
// 		const orderTest = new Order({
// 			orderId: "OrderOne",
// 			users: [
// 				{
// 					username: "UserZero",
// 					products: [
// 						{
// 							productname: "Strawberries",
// 							quantity: 23
// 						}
// 					]
// 				}
// 			]
// 		});
// 		orderTest.save((err, doc) => {
// 			if (err) {
// 				console.log(err);
// 			}
// 			console.log("Data entered");
// 		});
// 		// console.log(orderTest);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

router.get("/", async (req, res) => {
	const savedOrders = await Order.find();
	res.json(savedOrders);
	// res.json({
	// 	message: "Welcome to the orders section!"
	// });
});

router.get("/:ordNum", async (req, res) => {
	const number = req.params.ordNum;
	// res.json(number);
	const orderId = `order${String(number)}`;
	Order.find({ orderId: orderId }, (err, data) => {
		// gestire error
		console.log(data);
		res.json(data);
	});
});

router.post("/", async (req, res) => {
	try {
		const data = await req.body;
		// body = {
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
		const newOrder = new Order(data);
		newOrder.save((err, doc) => {
			if (err) {
				console.log(err);
			}
			res.json(newOrder);

			// Qui possibile Ric...
		});
	} catch (error) {
		console.log(error);
	}
});

router.put("/:ordNum", async (req, res) => {
	const data = await req.body;
	// body = {
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
});

router.delete("/:ordNum", async (req, res) => {
	const number = req.params.ordNum;
	const orderId = `order${String(number)}`;
	const orderRemoved = await Order.findOneAndDelete({ orderId: orderId });
	res.json(orderRemoved);
});

// Delete all
router.delete("/", (req, res) => {
	Order.remove({}, (err, doc) => {
		if (err) {
			console.log(err);
		}
		res.json({
			message: "All data removed."
		});
	});
});
// Delete all

module.exports = router;
