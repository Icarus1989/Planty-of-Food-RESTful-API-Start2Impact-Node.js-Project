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

router.get("/:prodId", async (req, res) => {
	const prodId = await req.params.prodId;
	// console.log(param);
	const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(1)}`;
	Product.find({ name: label }, (err, data) => {
		// gestire error
		// console.log(data);
		res.json(data);
	});
});

router.post("/", (req, res) => {
	try {
		const productTest = new Product({
			name: "Strawberries",
			quantity: 23,
			origin: "Italy"
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

router.put("/:prodId", async (req, res) => {
	const prodId = await req.params.prodId;
	const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(1)}`;
	const productChanged = await Product.findOneAndUpdate(
		{ name: label },
		{
			quantity: 56
		},
		{
			new: true
		}
	);
	res.json(productChanged);
});

router.delete("/:prodId", async (req, res) => {
	const prodId = req.params.prodId;
	const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(1)}`;
	const productRemoved = await Product.findOneAndDelete({
		name: label
	});
	res.json(productRemoved);
});

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
