const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { celebrate, Joi, errors, Segments } = require("celebrate");

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
		res.json(data);
	});
});

router.post("/", async (req, res) => {
	try {
		const data = await req.body;
		// body = {
		// 	name: "Bananas",
		// 	quantity: 50,
		// 	origin: "Brazil"
		// };
		const newProduct = new Product(await data);
		newProduct.save((err, doc) => {
			if (err) {
				console.log(err);
			}
			console.log("Data entered");
		});
		res.json(newProduct);
	} catch (error) {
		console.log(error);
	}
});

router.put("/:prodId", async (req, res) => {
	const data = await req.body;
	// body = {
	// 	quantity: 56
	// };
	const prodId = await req.params.prodId;
	const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(1)}`;
	const productChanged = await Product.findOneAndUpdate({ name: label }, data, {
		new: true
	});
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
