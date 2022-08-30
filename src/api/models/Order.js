const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	orderid: { type: String, default: "order00001" },
	users: [
		{
			username: { type: String, default: "UserTest" },
			products: [
				{
					productname: { type: String, default: "ProductXXXXX" },
					quantity: { type: Number }
				}
			],
			cost: { type: Number }
		}
	],
	date: { type: Date, default: Date.now },
	totalprice: { type: Number },
	shipped: { type: Boolean, default: false }
});

const conn = mongoose.createConnection(
	`mongodb://localhost:27017/PoFTestDatabase`
);
module.exports = conn.model("orders", orderSchema, "orders-archieve");
