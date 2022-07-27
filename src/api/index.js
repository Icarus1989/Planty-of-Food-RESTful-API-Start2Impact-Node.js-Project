const express = require("express");
const BodyParser = require("body-parser");

const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");

const router = express.Router();
router.get("/", (req, res) => {
	res.json({
		message: "Welcome to Planty of Food API."
	});
});

router.use(BodyParser.json());
router.use("/products-storage", products);
router.use("/users", users);
router.use("/orders-archieve", orders);

module.exports = router;
