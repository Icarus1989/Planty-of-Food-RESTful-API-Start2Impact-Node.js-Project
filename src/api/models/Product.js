const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, default: "newProduct" },
	quantity: { type: Number }
});

const conn = mongoose.createConnection(
	`mongodb://localhost:27017/PoFTestDatabase`
);
module.exports = conn.model("products", productSchema, "products-storage");

// const product = {
// 	name: "xxxxx", // <--- id
// 	quantity: XXXXX
// };
