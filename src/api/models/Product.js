const mongoose = require("mongoose");
require("dotenv").config();

const productSchema = new mongoose.Schema(
	{
		name: { type: String, default: "newProduct" },
		quantity: { type: Number },
		origin: { type: String, default: "Italy" },
		price: { type: Number, float: true }
	},
	{
		collection: "products-storage"
	}
);

const conn = mongoose.createConnection(
	`mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@warehousedb.vzplxdv.mongodb.net/PoFDatabase?retryWrites=true&w=majority`
);
module.exports = conn.model("products", productSchema, "products-storage");

// const product = {
// 	name: "xxxxx", // <--- id
// 	quantity: XXXXX
// };

// `mongodb://localhost:27017/PoFTestDatabase`;
