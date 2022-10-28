const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: true, default: "newUser" },
		lastname: { type: String, required: true, default: "" },
		username: { type: String, required: true, default: "new user" },
		address: {
			type: String,
			required: true,
			lowercase: true,
			default: "one@one.com"
		},
		date: { type: Date, required: true, default: Date.now },
		orders: [
			{
				orderid: String,
				url: String
			}
		]
	},
	{
		collection: "users"
	}
);

const conn = mongoose.createConnection(
	`mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@warehousedb.vzplxdv.mongodb.net/PoFDatabase?retryWrites=true&w=majority`
);
module.exports = conn.model("users", userSchema, "users");
