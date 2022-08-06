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

// -------------

// if (query.filter && query.value) {
// 	try {
// 		const savedOrders = await Order.find({
// 			[query.filter]: query.value
// 		});
// 		// console.log(savedOrders);
// 		if (query.order && query.order == "descent") {
// 			const orders = savedOrders.sort(reorderDescent);
// 			return res.json(orders);
// 		} else if (query.order && query.order == "ascendent") {
// 			const orders = savedOrders.sort(reorderAscedent);
// 			return res.json(orders);
// 		} else {
// 			return res.status(200).json(savedOrders);
// 		}
// 	} catch (error) {
// 		// const savedOrders = await Order.find({});
// 		// try {
// 		// 	for (let obj of savedOrders) {
// 		// 		console.log(obj);
// 		// 	}
// 		// } catch (error) {
// 		next(error);
// 		// }
// 	}
// } else {
// 	const savedOrders = await Order.find({});
// 	res.status(203).json(savedOrders);
// }
