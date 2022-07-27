const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstname: { type: String, required: true, default: "newUser" },
	lastname: { type: String, required: true, default: "" },
	username: { type: String, required: true, default: "new user" },
	address: {
		type: String,
		required: true,
		lowercase: true,
		default: "one@one.com"
	},
	createdAt: { type: Date, default: Date.now },
	orders: [
		{
			orderid: String,
			url: String
		}
	]
});

const conn = mongoose.createConnection(
	`mongodb://localhost:27017/PoFTestDatabase`
);
module.exports = conn.model("users", userSchema, "users");
// "firstname": "xxxxx",
// 	  "lastname": "xxxxx",
// 	  "username": "xxxxx",
// 	  "mailaddress": "one@one.com",
// 	  "orders": [
// 		{
// 			"orderid": "order00001",
// 			"url": "path"
// 		},
// 		{
// 			"orderid": "order00002",
// 			"url": "path"
// 		},
// 		{
// 			"orderid": "order00003",
// 			"url": "path"
// 		}
// 	]
