const mongoose = require("mongoose");
require("dotenv").config();

const orderSchema = new mongoose.Schema(
	{
		orderid: { type: String, default: "order00000" },
		users: [
			{
				username: { type: String, default: "UserTest" },
				products: [
					{
						productname: { type: String, default: "ProductXXXXX" },
						quantity: { type: Number, default: 0 }
					}
				],
				cost: { type: Number }
			}
		],
		date: { type: Date, default: Date.now },
		totalcost: { type: Number },
		shipped: { type: Boolean, default: false }
	},
	{
		collection: "orders-archieve"
	}
);

const conn = mongoose.createConnection(
	`mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@warehousedb.vzplxdv.mongodb.net/PoFDatabase?retryWrites=true&w=majority`
);
module.exports = conn.model("orders", orderSchema, "orders-archieve");
