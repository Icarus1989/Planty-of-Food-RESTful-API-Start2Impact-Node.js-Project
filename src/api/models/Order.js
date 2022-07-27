const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	orderId: { type: String, default: "order00001" },
	users: [
		{
			username: { type: String, default: "UserTest" },
			products: [
				{
					productname: { type: String, default: "ProductXXXXX" },
					quantity: { type: Number }
				}
			]
		}
	],
	createdAt: { type: Date, default: Date.now },
	shipped: { type: Boolean, default: false }
});

const conn = mongoose.createConnection(
	`mongodb://localhost:27017/PoFTestDatabase`
);
module.exports = conn.model("orders", orderSchema, "orders-archieve");
