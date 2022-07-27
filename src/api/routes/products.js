const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const router = express.Router();
const app = express();

// mongoose.connect(
// 	`mongodb://localhost:27017/PoFTestDatabase`,
// 	() => {
// 		console.log("connected");
// 	},
// 	(error) => {
// 		console.log(error);
// 	}
// );

// testInsertData();

async function testInsertData() {
	try {
		const productTest = new Product({
			name: "TestProductOne",
			quantity: 1
		});
		productTest.save((err, doc) => {
			if (err) {
				console.log(err);
			}
			console.log("Data entered");
		});
		console.log(productTest);
	} catch (error) {
		console.log(error);
	}
}

router.get("/", async (req, res) => {
	const savedProducts = await Product.find({});
	res.json(savedProducts);
});

router.post("/", (req, res) => {
	try {
		const productTest = new Product({
			name: "Strawberries",
			quantity: 100
		});
		productTest.save((err, doc) => {
			if (err) {
				console.log(err);
			}
			console.log("Data entered");
		});
		res.json(productTest);
	} catch (error) {
		console.log(error);
	}
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

// Delete all
router.delete("/", (req, res) => {
	Product.remove({}, (err, doc) => {
		if (err) {
			console.log(err);
		}
		res.json({
			message: "All data removed."
		});
		// console.log("Insered");
	});
});
// Delete all

module.exports = router;
