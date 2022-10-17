const express = require("express");

const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const {
	OrderManagerClass,
	ProductUpdaterClass,
	UserUpdaterClass
} = require("../routes/classes");

async function getAllOrders(req, res, next) {
	try {
		const query = req.query;
		const savedOrders = await Order.find({});

		const orderManager = new OrderManagerClass(
			res,
			savedOrders,
			query.filter,
			query.value,
			query.orderby,
			query.sort
		);
		orderManager.parametersHandling();
	} catch (error) {
		next(error);
	}
}

async function getOneOrder(req, res, next) {
	try {
		const orderNumber = req.params.ordNum;
		const orderId = `order${String(orderNumber)}`;
		const data = await Order.findOne({ orderid: orderId });
		if (data !== null) {
			res.status(200).json(data);
		} else {
			res.status(200).json({
				message: `${orderId} not exists`
			});
		}
	} catch (error) {
		next(error);
		// res.status(500).json({
		// 	message: `Error in searching order`
		// });
	}
}

async function postOneOrder(req, res, next) {
	try {
		const data = await req.body;

		const prodUpdater = new ProductUpdaterClass(data, Product, Order, res);
		const userUpdater = new UserUpdaterClass(data, User, Order, res);

		const orderExists = await prodUpdater.orderExistsCheck();
		const existCheck = await userUpdater.usersExistCheck();

		if (existCheck["message0"]) {
			console.log("One");
			res.status(200).json(existCheck);
		} else if (orderExists !== null) {
			console.log("Two");
			res.status(200).json({
				message: "OrderId already exists"
			});
		} else if (orderExists == null) {
			console.log("Three");
			console.log(orderExists);

			const sp = await prodUpdater.searchProd(); // far funzionare searchProd
			console.log(sp);
			await prodUpdater.createResults();
			const numOfErrs = await prodUpdater.createNewOrder();
			// console.log("numOfErrs");
			// console.log(numOfErrs);
			if (numOfErrs == 0) {
				console.log("Zero Errors");
				await userUpdater.updateAccountsNewOrder();
			} else {
				return;
			}
		}

		// Qui possibile Ric...
	} catch (error) {
		res.status(404).json({ message: "Problem occured" });
		next(error);
	}
}

async function putOneOrder(req, res, next) {
	try {
		const data = await req.body;
		const orderNumber = await req.params.ordNum;
		const orderId = `order${String(orderNumber)}`;
		const orderChanged = await Order.findOneAndUpdate(
			{ orderId: orderId },
			data,
			{
				new: true
			}
		);

		res.status(200).json(orderChanged);
	} catch (error) {
		next(error);
	}
}

async function deleteOneOrder(req, res, next) {
	try {
		const orderNumber = await req.params.ordNum;
		const orderId = `order${String(orderNumber)}`;
		const orderRemoved = await Order.findOneAndDelete({ orderid: orderId });

		const userUpdater = new UserUpdaterClass(
			await orderRemoved,
			User,
			Order,
			res
		);
		const prodUpdater = new ProductUpdaterClass(
			await orderRemoved,
			Product,
			Order,
			res
		);
		// verificare effettivo utilizzo di prodUpdater
		const updates = await userUpdater.updateAccountsDelOrder();
		// const restores = await prodUpdater.restoreQuantities();
		// res.status(200).json({
		// 	message: "Order delete."
		// });
	} catch (error) {
		next(error);
	}
}

module.exports = {
	getAllOrders,
	getOneOrder,
	postOneOrder,
	putOneOrder,
	deleteOneOrder
};
