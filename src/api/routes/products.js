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

router.get("/", async (req, res, next) => {
	try {
		const savedProducts = await Product.find({});
		res.json(savedProducts);
	} catch (error) {
		next(error);
	}
});

router.get("/:prodId", async (req, res, next) => {
	try {
		const prodId = await req.params.prodId;
		const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
			1
		)}`;
		Product.find({ name: label }, (err, data) => {
			// gestire error con 404 o altro
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
			name: Joi.string().required(),
			quantity: Joi.number().integer().greater(0).required(),
			origin: Joi.string().required(),
			price: Joi.number().precision(2).required()
		})
	}),
	async (req, res, next) => {
		try {
			const data = await req.body;
			const newProduct = new Product(await data);
			newProduct.save((err, doc) => {
				if (err) {
					console.log(err);
				}
				console.log("Data entered");
			});
			res.json(newProduct);
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	"/:prodId",
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string(),
			quantity: Joi.number().integer().greater(0),
			origin: Joi.string()
		})
	}),
	async (req, res, next) => {
		try {
			const data = await req.body;
			const prodId = await req.params.prodId;
			const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
				1
			)}`;
			const productChanged = await Product.findOneAndUpdate(
				{ name: label },
				data,
				{
					new: true
				}
			);
			res.json(productChanged);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	"/:prodId",
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string().required(),
			quantity: Joi.number().integer().greater(0),
			origin: Joi.string()
		})
	}),
	async (req, res, next) => {
		try {
			const prodId = req.params.prodId;
			const label = `${String(prodId)[0].toUpperCase()}${String(prodId).slice(
				1
			)}`;
			const productRemoved = await Product.findOneAndDelete({
				name: label
			});
			res.json(productRemoved);
		} catch (error) {
			next(error);
		}
	}
);

// Delete all
router.delete("/", (req, res, next) => {
	try {
		Product.remove({}, (err, doc) => {
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
// // 	name: "Bananas",
// // 	quantity: 50,
// // 	origin: "Brazil"
// // };

// body put = {
// 	quantity: 56
// };
