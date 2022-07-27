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

router.post("/", (req, res) => {
	try {
		const orderTest = new Order({
			orderId: "order000002",
			users: [
				{
					username: "UserOne",
					products: [
						{
							productname: "Watermelon",
							quantity: 23
						},
						{
							productname: "Strawberries",
							quantity: 23
						}
					]
				}
			],
			shipped: false
		});
		orderTest.save((err, doc) => {
			if (err) {
				console.log(err);
			}
			res.json(orderTest);

			// Qui possibile Ric...
		});
		// console.log(orderTest);
	} catch (error) {
		console.log(error);
	}
});

router.put("/:ordNum", async (req, res) => {
	const number = req.params.ordNum;
	const orderId = `order${String(number)}`;

	const orderChanged = await Order.findOneAndUpdate(
		{ orderId: orderId },
		{
			users: {
				username: "UserZero",
				products: [
					{
						productname: "Strawberries",
						quantity: 5
					},
					{
						productname: "Watermelon",
						quantity: 5
					}
				]
			}
		},
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
