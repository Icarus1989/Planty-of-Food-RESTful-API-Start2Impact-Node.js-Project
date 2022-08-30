const mongoose = require("mongoose");
// const Float = require("@waape/mongoose-float").loadType(mongoose, 2);

const productSchema = new mongoose.Schema({
	name: { type: String, default: "newProduct" },
	quantity: { type: Number },
	origin: { type: String, default: "Italy" },
	price: { type: Number, float: true }
});

const conn = mongoose.createConnection(
	`mongodb://localhost:27017/PoFTestDatabase`
);
module.exports = conn.model("products", productSchema, "products-storage");

// const product = {
// 	name: "xxxxx", // <--- id
// 	quantity: XXXXX
// };
