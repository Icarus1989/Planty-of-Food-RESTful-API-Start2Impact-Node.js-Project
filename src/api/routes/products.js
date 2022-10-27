const express = require("express");
const api = require("../../api");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const {
	getAllProducts,
	getOneProduct,
	postOneProduct,
	putOneProduct,
	deleteOneProduct
} = require("../controllers/productController");

const {
	OrderManagerClass,
	ProductUpdaterClass,
	UserUpdaterClass
} = require("../routes/classes");

const router = express.Router();
// const app = express();

// mongoose.connect(
// 	`mongodb://localhost:27017/PoFTestDatabase`,
// 	() => {
// 		console.log("connected");
// 	},
// 	(error) => {
// 		console.log(error);
// 	}
// );

router.get("/", getAllProducts);

router.get("/:prodid", getOneProduct);

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
	postOneProduct
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
	putOneProduct
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
	deleteOneProduct
);

// Delete all
// router.delete("/", (req, res, next) => {
// 	try {
// 		Product.remove({}, (err, doc) => {
// 			if (err) {
// 				console.log(err);
// 			}
// 			res.json({
// 				message: "All data removed."
// 			});
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });
// Delete all

module.exports = router;
